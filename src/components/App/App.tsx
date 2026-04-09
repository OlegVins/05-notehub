import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { useDebouncedCallback } from 'use-debounce';
import css from './App.module.css';

export default function App() {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleSearch = useDebouncedCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, 500);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', page, search],
        queryFn: () => fetchNotes(page, search),
        placeholderData: keepPreviousData,
    });

    const notes = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 0;

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox
                    onChange={handleSearch}
                />

                {totalPages > 1 && (
                    <Pagination
                        pageCount={totalPages}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                )}

                <button className={css.button}
                    onClick={() => setIsModalOpen(true)}
                >
                    Create note +
                </button>
            </header>

            {!isLoading && !isError && notes.length > 0 && (
                <NoteList notes={notes}
                />
            )}

            {isModalOpen && (
                <Modal onClose={() =>
                    setIsModalOpen(false)}>
                    <NoteForm onClose={() =>
                        setIsModalOpen(false)}
                    />
                </Modal>
            )}
        </div>
    );
}