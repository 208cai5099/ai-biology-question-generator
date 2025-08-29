export type FormContext = {
    updateTopic: (topic: string) => void,
    topic: string,
    updatePLD: (newPLD: string) => void,
    isGenerating: boolean,
    updatePhenomenon: (phenomenon: string) => void,
    setMCQuestions: React.Dispatch<React.SetStateAction<number>>
    setOpenQuestions: React.Dispatch<React.SetStateAction<number>>
}