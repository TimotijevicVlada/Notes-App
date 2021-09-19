export default class NotesAPI {
    //Funkcija za uzimanje svih podataka iz local storage
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
        return notes.sort((a, b) => new Date(a.updated) > new Date(b.updated) ? -1 : 1);
    }
    //Funkcija za postavljanje podataka u local storage
    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);
        if(existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }
        
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }
    //Funkcija za brisanje podataka iz local storage
    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);
        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}