# Optimisations du Système de Chargement de Données

## Améliorations Apportées

### 1. **Service de Cache Intelligent** (`src/services/dataService.ts`)
- **Caching en mémoire** : Les données sont cachées pendant 1 heure pour éviter les refetch inutiles
- **Déduplication des requêtes parallèles** : Si deux requêtes pour les mêmes données sont lancées en même temps, elles partagent la même promesse
- **Lazy loading** : Les données ne sont chargées que quand elles sont utilisées
- **Preloading en arrière-plan** : Chargement anticipé des prochaines sections (Ex: Projects preload Experiences)

### 2. **Custom Hooks Réutilisables** (`src/hooks/useData.ts`)
- **`useData<T>`** : Hook pour charger des listes de données avec état de loading
- **`useDataById<T>`** : Hook pour charger un élément spécifique par slug/ID
- **Gestion d'erreur intégrée** : Capture et affiche les erreurs de chargement

### 3. **Composants Optimisés**

#### Projects.tsx
- Utilise `useData()` + `dataService`
- Preload des Experiences en background
- Spinner de loading
- Plus de requête directe en fetch

#### Experience.tsx
- Utilise `useData()` + `dataService`
- Preload des Projects en background
- Spinner de loading

#### ProjectPage.tsx
- Utilise `useDataById()` pour lazy loading du projet
- Spinner de loading amélioré
- Gestion d'erreur avec message "Project not found"
- Preload des Experiences

#### ExperiencePage.tsx
- Utilise `useDataById()` pour lazy loading de l'expérience
- Spinner de loading amélioré
- Gestion d'erreur avec message "Experience not found"
- Preload des Projects

---

## Bénéfices de Performance

| Métrique | Avant | Après |
|----------|-------|-------|
| **Requêtes redondantes** | Oui | Non |
| **Parsing JSON multiple** | Oui | 1 seule fois |
| **Temps de chargement initial** | Lent | Plus rapide |
| **Expérience UX** | Basique | Fluide avec spinners |
| **Réutilisabilité de code** | Faible | Haute |

---

## Utilisation

### Charger une liste complète
```tsx
import { useData } from '../hooks/useData'
import { loadProjects } from '../services/dataService'

function MyComponent() {
  const { data: projects, loading, error } = useData(loadProjects, [])
  
  if (loading) return <Spinner />
  if (error) return <Error message={error.message} />
  
  return <ProjectsList projects={projects} />
}
```

### Charger un élément spécifique
```tsx
import { useDataById } from '../hooks/useData'
import { loadProjectBySlug } from '../services/dataService'

function ProjectDetail({ slug }) {
  const { data: project, loading } = useDataById(
    (id) => loadProjectBySlug(id),
    slug
  )
  
  if (loading) return <Spinner />
  return <ProjectDetail project={project} />
}
```

### Preload en arrière-plan
```tsx
import { preloadData } from '../services/dataService'

// Charger les données en background
useEffect(() => {
  preloadData('/data/projects.json')
}, [])
```

---

## Améliorations Futures Possibles

1. **IndexedDB** : Pour un cache persistant au-delà de 1h
2. **Service Worker** : Pour offline support
3. **Progressive Loading** : Charger les images de manière progressive
4. **API GraphQL** : Requêtes plus optimisées
5. **React Query** : Bibliothèque complète de gestion de cache
