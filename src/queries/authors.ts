import type * as pb from "#/generated/books";

export async function GetAuthors() {
    try {
        const response = await fetch("http://localhost:8080/protobuf/authors", {
            method: "GET",
        });

        console.log("data fetched", response.ok);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const buffer = await response.arrayBuffer();

        return buffer;
    } catch (e) {
        console.error("Error fetching authors:", e);
        throw e;
    }
}

export async function CreateAuhtor(author: pb.schema.Author) {
    try {
        const response = await fetch("http://localhost:8080/protobuf/authors", {
            method: "POST",
            headers: {
                "Content-Type": "application/protobuf",
            },
            // @ts-expect-error: sending a buffer
            body: author.serializeBinary(),
        });

        console.log("data fetched", response.ok);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const buffer = await response.arrayBuffer();

        return buffer;
    } catch (e) {
        console.error("Error fetching authors:", e);
        throw e;
    }
}
