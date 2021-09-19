import NotesAPI from "./NotesAPI.js";

console.log(NotesAPI.getAllNotes());

NotesAPI.saveNote({
    title: "New note",
    body: "I am a last updated note..."
})