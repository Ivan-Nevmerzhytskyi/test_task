import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import './UsersSearch.scss';
import { UserType } from '../../../../common/types/UserType';
import { getSearchWith, SearchParams } from '../../../../utils/searchHelper';

// Decorator to implement delay for function running
// eslint-disable-next-line @typescript-eslint/ban-types
function debounce(f: Function, delay: number) {
  let timerId = 0;

  return (...args: unknown[]) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(f, delay, ...args);
  };
}

function handleSearchQuery(string: string, searchQuery: string) {
  return string.toLowerCase().includes(searchQuery.toLowerCase());
}

type Props = {
  users: UserType[];
  onSearchedUsers: (searchedUsers: UserType[]) => void;
};

export const UsersSearch: React.FC<Props> = React.memo(
  ({ users, onSearchedUsers }) => {
    const firstRender = useRef(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [appliedQuery, setAppliedQuery] = useState(
      searchParams.get('query') || '',
    );

    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false;

        return;
      }

      const foundUsers = users.filter(user => {
        const { name, email } = user;

        return (
          handleSearchQuery(name, appliedQuery)
          || handleSearchQuery(email, appliedQuery)
        );
      });

      onSearchedUsers(foundUsers);
    }, [users, appliedQuery]);

    // set the search query to the url with additional 'params'
    const setSearchWith = (params: SearchParams) => {
      const search = getSearchWith(params, searchParams);

      setSearchParams(search);
    };

    // set a delay of 1s to defer the book search implementation
    const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setSearchWith({ query: value || null });
      applyQuery(value);
    };

    return (
      <div className="usersSearch">
        <label htmlFor="search-query" className="usersSearch__label">
          Search user by name or email
        </label>

        <input
          type="search"
          id="search-query"
          name="query"
          className="usersSearch__input"
          placeholder="Type search word"
          value={query}
          onChange={handleQueryChange}
        />
      </div>
    );
  },
);
