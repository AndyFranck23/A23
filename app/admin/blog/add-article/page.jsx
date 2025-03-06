import AddArticle from "@/components/admin/AddArticle";
import ListeArticle from "@/components/admin/ListeArticle";

export default function page() {
    return (
        <>
            <AddArticle page={'blog'} />
            <div className="mt-20">
                <ListeArticle page={'blog'} />
            </div>
        </>
    )
}
