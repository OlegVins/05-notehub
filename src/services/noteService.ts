import axios,{ type AxiosResponse } from 'axios';
import type { Note, NoteTag } from '../types/note';

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export interface CreateNoteRequest {
    title: string;
    content: string;
    tag: NoteTag;
}

const BASE_URL = 'https://notehub-public.goit.study/api';

axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

export const fetchNotes = async (page: number, search: string): Promise<FetchNotesResponse> => {
    const response: AxiosResponse<FetchNotesResponse> =  await axios.get(`${BASE_URL}/notes`, {
        params: {
            page,
            perPage: 12,
            search,
        },
    });
    return response.data;
};

export const createNote = async (
    note: CreateNoteRequest): Promise<Note> => {
    const response: AxiosResponse<Note> = await axios.post(`${BASE_URL}/notes`,
        note
    );
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
     const response: AxiosResponse<Note> = await axios.delete(`${BASE_URL}/notes/${id}`  
);
return response.data;
};



