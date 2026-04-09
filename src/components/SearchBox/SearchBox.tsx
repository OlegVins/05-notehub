import css from './SearchBox.module.css';

interface SearchBoxProps {
    ocChange: (value: string) => void;
}

export default function SearchBox({ ocChange }: SearchBoxProps) {
    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            onChange={e => ocChange(e.target.value)}
        />
    );
}