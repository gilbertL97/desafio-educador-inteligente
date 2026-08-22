import {
  type SimulationFormData,
  type SimulationRecord,
} from '@/data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

const readSimulations = (): SimulationRecord[] => {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!storage) {
    return []
  }

  try {
    return JSON.parse(storage) as SimulationRecord[]
  } catch {
    return []
  }
}

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const record: SimulationRecord = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
    }

    const savedData = readSimulations()

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...savedData, record]),
    )

    return id
  }

  const getAllSimulations = (): SimulationRecord[] =>
    [...readSimulations()].reverse()

  const getFormData = (id: string) => {
    const savedData = readSimulations()
    return savedData.find((record) => record.id === id) || null
  }

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const savedData = readSimulations()

    const updated = savedData.map((record) =>
      record.id === id ? { ...data } : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  const deleteSimulation = (id: string) => {
    const savedData = readSimulations()
    const updated = savedData.filter((record) => record.id !== id)

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  return {
    saveFormData,
    getAllSimulations,
    getFormData,
    updateSimulation,
    deleteSimulation,
  }
}
