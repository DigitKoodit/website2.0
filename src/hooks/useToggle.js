import { useCallback, useEffect, useMemo, useState } from 'react'

const useToggle = (initialState = false) => {
  const [isEnabled, setIsEnabled] = useState(initialState)
  const toggle = useCallback(() => setIsEnabled(isEnabled => !isEnabled), [])
  const disable = useCallback(() => setIsEnabled(false), [])
  const enable = useCallback(() => setIsEnabled(true), [])

  const api = useMemo(() => ({
    toggle,
    disable,
    enable
  }), [toggle, disable, enable])

  return [isEnabled, api]
}

export default useToggle

export const useDelayedToggle = delay => {
  const [isEnabled, api] = useToggle(false)
  useEffect(() => {
    let timer
    if(isEnabled && delay != null) {
      timer = setTimeout(() => { api.disable() }, delay)
    }
    return () => clearTimeout(timer)
  }, [api, delay, isEnabled])
  return [isEnabled, api]
}
