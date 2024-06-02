import { Select } from '@chakra-ui/react';
import React from 'react';
import LanguageIcon from '../custom-icons/language';

interface ILanguageSelectorProps {
    language: string;
    handleLanguageChange: (newLanguage: string) => void;
    languageOptions: string[];
}

export const LanguageSelector: React.FC<ILanguageSelectorProps> = ({
    language,
    handleLanguageChange,
    languageOptions
}) => {

    return (
        <div>
            <Select
                value={language}
                icon={<LanguageIcon />}
                onChange={(e) => handleLanguageChange(e.target.value)}>
                {languageOptions.map((language) => (
                    <option key={language} value={language}>
                        {language}
                    </option>
                ))}
            </Select>
        </div>
    );
};