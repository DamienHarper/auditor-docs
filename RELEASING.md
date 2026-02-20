# Release Guide

Ce document décrit le processus de publication d'une nouvelle version de **auditor** et/ou **auditor-bundle**, et comment la documentation est mise à jour automatiquement.

---

## Vue d'ensemble du pipeline

```
auditor (tag x.y.z)          auditor-bundle (tag x.y.z)
        │                              │
        ▼                              ▼
  sync-docs.yml                  sync-docs.yml
  (GitHub Actions)               (GitHub Actions)
        │                              │
        └──────────┬───────────────────┘
                   ▼
           auditor-docs (master)
           ├── docs/auditor/           ← doc courante auditor
           ├── docs/auditor-bundle/    ← doc courante auditor-bundle
           └── [versioned snapshots]
                   │
                   ▼
            deploy.yml
            (GitHub Actions)
                   │
                   ▼
          GitHub Pages (production)
```

**Tout est automatisé** à partir du moment où un tag est poussé sur `auditor` ou `auditor-bundle`.

---

## Prérequis

### Secret GitHub requis

Les workflows `sync-docs.yml` des deux repos ont besoin d'un **Personal Access Token (PAT)** pour pouvoir écrire dans ce repo (`auditor-docs`).

1. Créer un PAT sur GitHub : **Settings → Developer settings → Personal access tokens → Fine-grained tokens**
   - Repository : `DamienHarper/auditor-docs`
   - Permissions : `Contents: Read and Write`
2. Ajouter ce token comme secret dans **chacun** des deux repos (`auditor` et `auditor-bundle`) :
   - **Settings → Secrets and variables → Actions → New repository secret**
   - Nom : `AUDITOR_DOCS_PAT`
   - Valeur : le token créé ci-dessus

> ⚠️ Sans ce secret, les workflows `sync-docs.yml` échouent silencieusement.

---

## Cas 1 — Release mineure ou patch (ex : 4.1.0, 4.2.3)

**Aucune action manuelle sur auditor-docs.**

1. Mettre à jour la doc dans `docs/` du repo concerné (`auditor` ou `auditor-bundle`)
2. Pousser le tag :
   ```bash
   git tag 4.1.0
   git push origin 4.1.0
   ```
3. Le workflow `sync-docs.yml` se déclenche automatiquement :
   - Copie `docs/` → `auditor-docs/docs/auditor[bundle]/`
   - Commit + push sur `auditor-docs/master`
4. Le workflow `deploy.yml` d'`auditor-docs` se déclenche automatiquement :
   - Build Docusaurus
   - Déploiement sur GitHub Pages

**Total : ~3 min, zéro intervention.**

---

## Cas 2 — Release majeure (ex : 5.0.0)

**Aucune action manuelle non plus**, le versioning est géré automatiquement.

Quand le tag poussé est de la forme `X.0.0` (nouveau major) :

1. Le workflow `sync-docs.yml` détecte le changement de version majeure
2. Il **gèle automatiquement** la version courante (`4.x`) via :
   ```bash
   npm run docusaurus -- docs:version:auditor "4.x"
   ```
   Cela crée `auditor_versioned_docs/version-4.x/` — snapshot immuable de la doc 4.x
3. Il remplace ensuite `docs/auditor/` par la nouvelle doc 5.x
4. Un seul commit est pushé sur `auditor-docs` avec tout ça
5. `deploy.yml` reconstruit et déploie

**Le sélecteur de version dans le site sera automatiquement mis à jour.**

---

## Processus de release étape par étape

### Pour `auditor`

```bash
# 1. S'assurer que docs/ est à jour dans le repo auditor
cd /path/to/auditor

# 2. Créer et pousser le tag
git tag 4.1.0           # ou 5.0.0 pour un major
git push origin 4.1.0

# C'est tout. Surveiller le workflow sur :
# https://github.com/DamienHarper/auditor/actions
```

### Pour `auditor-bundle`

```bash
cd /path/to/auditor-bundle

git tag 7.1.0
git push origin 7.1.0

# Surveiller :
# https://github.com/DamienHarper/auditor-bundle/actions
```

### Vérifier le déploiement

```
https://github.com/DamienHarper/auditor-docs/actions
→ workflow "Deploy to GitHub Pages"
→ https://damienharper.github.io/auditor-docs/
```

---

## Cas exceptionnels (intervention manuelle)

### Corriger la doc sans faire de release

Si tu dois corriger une faute ou améliorer la doc sans pousser de nouvelle version :

```bash
cd /path/to/auditor-docs

# Modifier directement docs/auditor/ ou docs/auditor-bundle/
# (ou les versioned_docs pour une ancienne version)

git add -A
git commit -m "docs: fix typo in querying page"
git push
# → deploy.yml se déclenche automatiquement
```

### Modifier le thème / la configuration Docusaurus

```bash
cd /path/to/auditor-docs

# Modifier src/css/custom.css, src/pages/index.js, docusaurus.config.mjs…

git add -A
git commit -m "style: update hero dark mode"
git push
# → deploy.yml se déclenche automatiquement
```

### Corriger une ancienne version de la doc

Les snapshots gelés sont dans `auditor_versioned_docs/` et `auditor-bundle_versioned_docs/`.

```bash
# Exemple : corriger la doc auditor 3.x
vim auditor_versioned_docs/version-3.x/installation.md

git add -A
git commit -m "docs(3.x): fix installation instructions"
git push
```

---

## Architecture des dossiers

```
auditor-docs/
├── docs/
│   ├── auditor/              ← doc COURANTE (version en développement)
│   └── auditor-bundle/       ← doc COURANTE (version en développement)
│
├── auditor_versioned_docs/
│   └── version-3.x/          ← snapshot GELÉ de auditor 3.x
│
├── auditor-bundle_versioned_docs/
│   └── version-6.x/          ← snapshot GELÉ de auditor-bundle 6.x
│
├── auditor_versions.json      ← liste des versions gelées de auditor
├── auditor-bundle_versions.json ← liste des versions gelées de auditor-bundle
│
├── src/
│   ├── css/custom.css         ← thème global
│   └── pages/index.js         ← page d'accueil
│
├── docusaurus.config.mjs      ← configuration Docusaurus
└── .github/workflows/
    └── deploy.yml             ← build + déploiement GitHub Pages (on: push master)
```

---

## Checklist de release

### Release mineure / patch

- [ ] Doc à jour dans `docs/` du repo concerné
- [ ] Tag poussé (`git tag X.Y.Z && git push origin X.Y.Z`)
- [ ] Workflow `sync-docs` ✅ (GitHub Actions)
- [ ] Workflow `deploy` ✅ (GitHub Actions)

### Release majeure (X.0.0)

- [ ] Doc de la **nouvelle** version dans `docs/` du repo concerné
- [ ] Tag `X.0.0` poussé
- [ ] Vérifier que le snapshot de l'ancienne version est bien créé dans `*_versioned_docs/`
- [ ] Vérifier que `*_versions.json` est mis à jour
- [ ] Vérifier le sélecteur de version sur le site déployé
