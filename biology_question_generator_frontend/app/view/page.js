import Reading from "@/components/reading"
import DataTable from "@/components/data-table"
import QuestionCards from "@/components/question-cards"

export default function View() {

    return (
        <div className="flex flex-col items-center">
            <Reading/>
            <DataTable/>
            <QuestionCards/>
        </div>

    )
}