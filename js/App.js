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


    //Donja crta oznacava private method 
    //Handleri za dogadjaje
    _handlers() {
        return {
            //Kada selektujemo aside note
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            //Kada dodajemo novi note 
            onNoteAdd: () => {
                const newNote = {
                    title: "New Note..",
                    body: "New body.."
                }
                NotesApi.saveNote(newNote);
                this._refreshNotes();
            },
            //Kada editujemo postojeci note
            onNoteEdit: (title, body) => {
                NotesApi.saveNote({
                    id: this.activeNote.id,
                    title: title,
                    body: body
                })
                this._refreshNotes();
            },
            //Kada deletujemo stari note
            onNoteDelete: (noteId) => {
                NotesApi.deleteNote(noteId);
                this._refreshNotes();
            }
        };
    }
}