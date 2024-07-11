import axios from "axios";
import base_url from './../api/baseapi';

export interface Note {
  id?: number;
  title: string;
  description: string; 
  [key: string]: any;
}

interface ApiResponse<T> {
  data: T;
}

function NoteService() {
  const fetchNotes = async (token: string): Promise<{ data: { data: Note[] } }> => {
    const response = await axios.get(`${base_url}/notes/getNotesList`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  };
  
  const addNote = async (newNote: Note, token: string): Promise<Note> => {
    const response: ApiResponse<Note> = await axios.post(`${base_url}/notes/addNotes`, newNote, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  };

  return {
    fetchNotes,
    addNote,
  };
}

export default NoteService();
