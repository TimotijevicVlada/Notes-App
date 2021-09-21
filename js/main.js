import NotesAPI from "./NotesAPI.js";
import View from "./View.js";

//Ovo je glavni kontejner u koji ubacujemo sve
const app = document.getElementById("app");

//Pravimo novi konstruktor za View
const view = new View(app, {
    onNoteAdd() {
        console.log("Note has been added!");
    },
    onNoteEdit(newTitle, newBody) {
        console.log(newTitle);
        console.log(newBody);
    },
    onNoteSelect(id) {
        console.log("Note selected: " + id);
    },
    onNoteDelete(id) {
        console.log("Note delete: " + id);
    }
});

const notes = NotesAPI.getAllNotes();

view.updateNoteList(notes);
view.updateActiveNote(notes[0]);