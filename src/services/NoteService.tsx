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

const NoteService = {
  fetchNotes: async (token: string): Promise<{ data: { data: Note[] } }> => {
    try {
      const response = await axios.get(`${base_url}/notes/getNotesList`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  },
  
  addNote: async (newNote: Note, token: string): Promise<Note> => {
    try {
      const response: ApiResponse<Note> = await axios.post(`${base_url}/notes/addNotes`, newNote, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in adding note", error);
      throw error;
    }
  },
};

export default NoteService;