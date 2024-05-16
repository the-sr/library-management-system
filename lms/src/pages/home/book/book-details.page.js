import { useParams, useSearchParams } from "react-router-dom";
import HomePage from "../home.page"

const BookDetails = () => {
    let params = useParams()
    let [query, setquery] = useSearchParams();
    return (
        <>
            <HomePage />
            <div>
                Book Details
            </div>
        </>
    )
}
export default BookDetails;