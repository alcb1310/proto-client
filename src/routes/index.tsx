import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as pb from "#/generated/books";
import { GetAuthors } from "#/queries/authors";

export const Route = createFileRoute("/")({
    component: Home,
    loader: ({ context: { queryClient } }) => {
        queryClient.prefetchQuery({
            queryKey: ["authors"],
            queryFn: GetAuthors,
        });
    },
});

function Home() {
    const { data } = useSuspenseQuery({
        queryKey: ["authors"],
        queryFn: GetAuthors,
    });

    const authors = pb.schema.Authors.deserialize(data).authors;

    const list = authors.map((author) => <li key={author.id}>{author.name}</li>);

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
            <p className="mt-4 text-lg">
                Edit <code>src/routes/index.tsx</code> to get started.
            </p>

            <h2 className="mt-8 text-2xl font-bold">Authors</h2>
            <ul>{list}</ul>
        </div>
    );
}
