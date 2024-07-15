import axios from "axios";
import base_url from './../api/baseapi';

export interface Note {
  id?: number;
  title: string;
  description: string; 
  isPined?: boolean;
  isArchived?: boolean;
  isDeleted?: boolean;
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

  const updateNote = async (id: number, updatedNote: Note, token: string) => {
    const response: ApiResponse<Note> = await axios.post(`${base_url}/notes/updateNotes`, updatedNote, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  };

  const setNoteToArchive = (noteIdList: number[], token: string) => {
    return axios.post(`${base_url}/notes/archiveNotes`, {
      noteIdList,
      isArchived: true
    }, {
      headers: { Authorization: token },
    });
  };

  const setNoteToUnArchive = (noteIdList: number[], token: string) => {
    return axios.post(`${base_url}/notes/archiveNotes`, {
      noteIdList,
      isArchived: false
    }, {
      headers: { Authorization: token },
    });
  };
  
  const setNoteToTrash = (noteIdList: number[], token: string) => {
    return axios.post(`${base_url}/notes/trashNotes`, {
      noteIdList,
      isDeleted: true
    }, {
      headers: { Authorization: token },
    });
  };

  const setNoteToUnTrash = (noteIdList: number[], token: string) => {
    return axios.post(`${base_url}/notes/trashNotes`, {
      noteIdList,
      isDeleted: false
    }, {
      headers: { Authorization: token },
    });
  };
  
  
  const fetchTrashNotes = async (token: string): Promise<{ data: { data: Note[] } }> => {
    const response = await axios.get(`${base_url}/notes/getTrashNotesList`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  };
  
  const fetchArchiveNotes = async (token: string): Promise<{ data: { data: Note[] } }> => {
    const response = await axios.get(`${base_url}/notes/getArchiveNotesList`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  };

  const deleteForever = (noteIdList: number[], token: string) => {
    return axios.post(`${base_url}/notes/deleteForeverNotes`, {
      noteIdList,
      isDeleted: true
    }, {
      headers: { Authorization: token },
    });
  };
  

  return {
    fetchNotes,
    addNote,
    updateNote,
    setNoteToArchive,
    setNoteToUnArchive,
    setNoteToTrash,
    setNoteToUnTrash,
    fetchTrashNotes,
    fetchArchiveNotes,
    deleteForever
  };
}

export default NoteService();
