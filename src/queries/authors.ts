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
