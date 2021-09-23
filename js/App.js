import View from "./View.js";
import NotesApi from "./NotesAPI.js";

export default class App {
    constructor (root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new View(root, this._handlers());

        this._refreshNotes();
    }

    //Kada nam treba ponovno ispisivanje notova iz local storage
    _refreshNotes() {
        const notes = NotesApi.getAllNotes();

        this._setNotes(notes);
        if(notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);

    }

    //Kada hocemo da postavimo aktivan note
    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }



   
}