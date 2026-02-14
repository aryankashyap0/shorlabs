export default function BlogPost({ params }: { params: { slug: string } }) {
    return (
        <div>
            <h1>{params.slug}</h1>
        </div>
    );
}
