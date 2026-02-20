---
title: "Configuration reference"
---

```yaml
# config/packages/dh_auditor.yaml
dh_auditor:
    enabled: true
    timezone: 'UTC'

    # Invokable service (callable) that checks roles
    role_checker: 'dh_auditor.role_checker'

    # Invokable service (callable) that provides user information
    user_provider: 'dh_auditor.user_provider'

    # Invokable service (callable) that provides security information (IP, firewall name, etc)
    security_provider: 'dh_auditor.security_provider'

    providers:
        doctrine:
            table_prefix: ~
            table_suffix: '_audit'

            # columns ignored from auditing
            ignored_columns:
                - 'createdAt'
                - 'updatedAt'

            # audited entities
            entities:
                App\Entity\Author:
                    roles:
                        view:
                            - 'ROLE1'
                            - 'ROLE2'
                App\Entity\Post: ~
                App\Entity\Comment: ~
                App\Entity\Tag: ~

            # storage entity managers (storage services)
            storage_services:
                - '@doctrine.orm.default_entity_manager'

            # auditing entity managers (auditing services)
            auditing_services:
                - '@doctrine.orm.default_entity_manager'

            # Switch to enable/disable the audit viewer
            viewer: true

            # Invokable service (callable) that maps audit events to storage services
            storage_mapper: ~
```