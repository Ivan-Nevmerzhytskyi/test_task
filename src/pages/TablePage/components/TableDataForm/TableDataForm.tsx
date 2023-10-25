import React, { useEffect, useRef, useState } from 'react';
import './TableDataForm.scss';
import { useAppDispatch } from '../../../../customHooks/reduxHooks';
import * as usersActions from '../../../../store/features/users';

type Props = {
  userId: number;
  data: string;
  field: string;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TableDataForm: React.FC<Props> = React.memo(({
  userId, data, field, isEditing, setIsEditing,
}) => {
  const [newData, setNewData] = useState(data);
  const inputField = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [isEditing]);

  function saveChanges() {
    setIsEditing(false);

    if (newData === data) {
      return;
    }

    dispatch(usersActions.partialUpdateUser({
      id: userId,
      [field]: newData,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    saveChanges();
  }

  function handleOnChangeEvent(event: React.ChangeEvent<HTMLInputElement>) {
    setNewData(event.target.value);
  }

  function handleKeyUpEvent(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        className="tableDataForm__field"
        defaultValue={data}
        ref={inputField}
        onChange={handleOnChangeEvent}
        onBlur={saveChanges}
        onKeyUp={handleKeyUpEvent}
      />
    </form>
  );
});
