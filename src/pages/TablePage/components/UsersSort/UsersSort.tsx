import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import './UsersSort.scss';
import { UserType } from '../../../../common/types/UserType';
import { SearchLink } from '../../../../common/components/SearchLink';

enum SortType {
  NONE = 'none',
  NAME = 'name',
  EMAIL = 'email',
  BIRTHDAY_DATE = 'birthday_date',
  PHONE_NUMBER = 'phone_number',
  ADDRESS = 'address',
}

type ReorderOptions = {
  sort: SortType;
  isReversed: boolean;
};

function isOfEnumType(value: string | null, enumType: { [s: string]: string }) {
  if (!value) {
    return false;
  }

  return Object.values(enumType).includes(value);
}

function getReorderedBooks(
  users: UserType[],
  { sort, isReversed }: ReorderOptions,
) {
  const visibleUsers = [...users];

  if (sort !== SortType.NONE) {
    visibleUsers.sort((user1, user2) => {
      switch (sort) {
        case SortType.NAME:
        case SortType.EMAIL:
        case SortType.BIRTHDAY_DATE:
        case SortType.PHONE_NUMBER:
        case SortType.ADDRESS:
          return user1[sort].localeCompare(user2[sort]);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleUsers.reverse();
  }

  return visibleUsers;
}

type Props = {
  users: UserType[];
  onSortedUsers: (sortedUsers: UserType[]) => void;
};

export const UsersSort: React.FC<Props> = React.memo(
  ({ users, onSortedUsers }) => {
    const [searchParams] = useSearchParams();
    const sort = isOfEnumType(searchParams.get('sortBy'), SortType)
      ? (searchParams.get('sortBy') as SortType)
      : SortType.NONE;
    const isReversed = searchParams.get('isReversed') === 'true' || false;
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
      const reorderedUsers = getReorderedBooks(users, { sort, isReversed });

      onSortedUsers(reorderedUsers);
    }, [users, sort, isReversed]);

    useEffect(() => {
      if (!isExpanded) {
        return;
      }

      const handleDocumentClick = () => {
        setIsExpanded(false);
      };

      document.addEventListener('click', handleDocumentClick);

      // eslint-disable-next-line consistent-return
      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };
    }, [isExpanded]);

    const handleDropdownTrigger = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      event.stopPropagation();
      setIsExpanded(current => !current);
    };

    return (
      <div className="usersSort">
        <div className="usersSort__sort-by">
          <button
            type="button"
            className={classNames('usersSort__trigger', {
              'usersSort__trigger--active': sort !== SortType.NONE,
            })}
            onClick={handleDropdownTrigger}
          >
            Sort by:
            {sort !== SortType.NONE && ` ${sort}`}
          </button>

          <div
            className={classNames('usersSort__dropdown-content', {
              'usersSort__dropdown-content--visible': isExpanded,
            })}
          >
            <SearchLink
              params={{ sortBy: SortType.NAME }}
              className="usersSort__dropdown-element"
              tabIndex={isExpanded ? 0 : -1}
            >
              name
            </SearchLink>

            <SearchLink
              params={{ sortBy: SortType.EMAIL }}
              className="usersSort__dropdown-element"
              tabIndex={isExpanded ? 0 : -1}
            >
              email
            </SearchLink>

            <SearchLink
              params={{ sortBy: SortType.BIRTHDAY_DATE }}
              className="usersSort__dropdown-element"
              tabIndex={isExpanded ? 0 : -1}
            >
              birthday date
            </SearchLink>

            <SearchLink
              params={{ sortBy: SortType.PHONE_NUMBER }}
              className="usersSort__dropdown-element"
              tabIndex={isExpanded ? 0 : -1}
            >
              phone number
            </SearchLink>

            <SearchLink
              params={{ sortBy: SortType.ADDRESS }}
              className="usersSort__dropdown-element"
              tabIndex={isExpanded ? 0 : -1}
            >
              address
            </SearchLink>
          </div>
        </div>

        <SearchLink
          params={{ isReversed: !isReversed || null }}
          className={classNames('usersSort__trigger', {
            'usersSort__trigger--active': isReversed,
          })}
        >
          reverse
        </SearchLink>

        {(sort !== SortType.NONE || isReversed) && (
          <SearchLink
            params={{
              isReversed: null,
              sortBy: null,
            }}
            className="usersSort__trigger"
          >
            reset
          </SearchLink>
        )}
      </div>
    );
  },
);
