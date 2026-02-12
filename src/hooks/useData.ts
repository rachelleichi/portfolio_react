import { useState, useEffect } from 'react'

interface UseDataState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * Custom hook for loading data with error handling
 */
export function useData<T>(
  fetcher: () => Promise<T>,
  dependencies: any[] = []
): UseDataState<T> {
  const [state, setState] = useState<UseDataState<T>>({
    data: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    let isMounted = true

    fetcher()
      .then(data => {
        if (isMounted) {
          setState({ data, loading: false, error: null })
        }
      })
      .catch(error => {
        if (isMounted) {
          setState({ data: null, loading: false, error })
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return state
}

/**
 * Custom hook for loading single item by ID/slug
 */
export function useDataById<T>(
  fetcher: (id: string) => Promise<T | null>,
  id: string | undefined
): UseDataState<T> {
  const [state, setState] = useState<UseDataState<T>>({
    data: null,
    loading: !!id,
    error: null
  })

  useEffect(() => {
    if (!id) {
      setState({ data: null, loading: false, error: null })
      return
    }

    let isMounted = true

    fetcher(id)
      .then(data => {
        if (isMounted) {
          setState({ data, loading: false, error: null })
        }
      })
      .catch(error => {
        if (isMounted) {
          setState({ data: null, loading: false, error })
        }
      })

    return () => {
      isMounted = false
    }
  }, [id, fetcher])

  return state
}
