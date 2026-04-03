import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { getScenarioDetail } from '../../../services/scenario'
import type { ScenarioDetail } from '../../../types/scenario'

interface UseScenarioDetailOptions {
  enabled?: boolean
}

function useScenarioDetail(
  id: string | undefined,
  options?: UseScenarioDetailOptions,
): UseQueryResult<ScenarioDetail | null, Error> {
  const enabled = options?.enabled ?? Boolean(id)

  return useQuery<ScenarioDetail | null, Error>({
    queryKey: ['scenario-detail', id],
    queryFn: () => getScenarioDetail(id ?? ''),
    enabled,
  })
}

export default useScenarioDetail
