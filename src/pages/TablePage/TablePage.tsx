import React, { useEffect, useState } from 'react';
import './TablePage.scss';
import { UserType } from '../../common/types/UserType';
import { useAppSelector, useAppDispatch } from '../../customHooks/reduxHooks';
import * as usersActions from '../../store/features/users';

import { UsersSort } from './components/UsersSort';
import { UsersSearch } from './components/UsersSearch';
import { Pagination } from './components/Pagination';
import { Loader } from '../../common/components/Loader';
import { ErrorNotification } from '../../common/components/ErrorNotification';
import { TableData } from './components/TableData';

const fields: (
  'name' | 'email' | 'birthday_date' | 'phone_number' | 'address'
)[] = [
  'name',
  'email',
  'birthday_date',
  'phone_number',
  'address',
];

export const TablePage: React.FC = React.memo(() => {
  const { users, loading, errorMessage } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const [sortedUsers, setSortedUsers] = useState<UserType[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<UserType[]>([]);
  const [visibleUsers, setVisibleBooks] = useState<UserType[]>([]);

  useEffect(() => {
    dispatch(usersActions.getUsers());
  }, []);

  return (
    <section className="tablePage">
      <div className="container">
        <div className="tablePage__content">
          <h1 className="tablePage__title">Table Page</h1>

          {loading && <Loader />}

          {!loading && !errorMessage && users.length > 0 && (
            <>
              <UsersSort users={users} onSortedUsers={setSortedUsers} />

              <UsersSearch
                users={sortedUsers}
                onSearchedUsers={setSearchedUsers}
              />

              <Pagination
                items={searchedUsers}
                setVisibleItems={setVisibleBooks}
              >
                {visibleUsers.length !== 0 ? (
                  <table className="tablePage__table">
                    <thead>
                      <tr className="tablePage__tr">
                        <th className="tablePage__th">Name</th>
                        <th className="tablePage__th">Email</th>
                        <th className="tablePage__th">Birthday date</th>
                        <th className="tablePage__th">Phone number</th>
                        <th className="tablePage__th">Address</th>
                      </tr>
                    </thead>

                    <tbody>
                      {visibleUsers.map(user => (
                        <tr
                          key={user.id}
                          className="tablePage__tr"
                        >
                          {fields.map(fieldName => (
                            <TableData
                              key={fieldName}
                              user={user}
                              field={fieldName}
                            />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>
                    There are no people matching the current search criteria
                  </div>
                )}
              </Pagination>
            </>
          )}

          {!loading && !errorMessage && users.length === 0 && (
            <div>There are no people on the server</div>
          )}

          {errorMessage && <ErrorNotification message={errorMessage} />}
        </div>
      </div>
    </section>
  );
});
