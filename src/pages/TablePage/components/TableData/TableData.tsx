import React, { useState } from 'react';
import './TableData.scss';
import { TableDataForm } from '../TableDataForm';
import { UserType } from '../../../../common/types/UserType';

type Props = {
  user: UserType;
  field: 'name' | 'email' | 'birthday_date' | 'phone_number' | 'address';
};

export const TableData: React.FC<Props> = React.memo(({ user, field }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <td
      className="tableData__td"
      onDoubleClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <TableDataForm
          userId={user.id}
          data={user[field]}
          field={field}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        `${user[field]}`
      )}
    </td>
  );
});
