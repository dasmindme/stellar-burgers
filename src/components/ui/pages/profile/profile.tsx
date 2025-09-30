import { FC, useState } from 'react';
import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import styles from './profile.module.css';
import commonStyles from '../common.module.css';

import { ProfileUIProps } from './type';
import { ProfileMenu } from '@components';

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange
}) => {
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  return (
    <main className={`${commonStyles.container}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <form
        className={`mt-30 ${styles.form} ${commonStyles.form}`}
        onSubmit={handleSubmit}
      >
        <>
          <div
            className={`pb-6 ${isNameEditable ? styles.editableWrapper : styles.disabledWrapper}`}
          >
            <Input
              type='text'
              placeholder='Имя'
              onChange={handleInputChange}
              value={formValue.name}
              name='name'
              disabled={!isNameEditable}
              icon={isNameEditable ? 'CloseIcon' : 'EditIcon'}
              onIconClick={() => setIsNameEditable(!isNameEditable)}
            />
          </div>

          <div
            className={`pb-6 ${isEmailEditable ? styles.editableWrapper : styles.disabledWrapper}`}
          >
            <Input
              type='email'
              placeholder='E-mail'
              onChange={handleInputChange}
              value={formValue.email}
              name='email'
              disabled={!isEmailEditable}
              icon={isEmailEditable ? 'CloseIcon' : 'EditIcon'}
              onIconClick={() => setIsEmailEditable(!isEmailEditable)}
            />
          </div>

          <div
            className={`pb-6 ${isPasswordEditable ? styles.editableWrapper : styles.disabledWrapper}`}
          >
            <Input
              type='password'
              placeholder='Пароль'
              onChange={handleInputChange}
              value={formValue.password}
              name='password'
              disabled={!isPasswordEditable}
              icon={isPasswordEditable ? 'CloseIcon' : 'EditIcon'}
              onIconClick={() => setIsPasswordEditable(!isPasswordEditable)}
            />
          </div>

          {isFormChanged && (
            <div className={styles.button}>
              <Button
                type='secondary'
                htmlType='button'
                size='medium'
                onClick={handleCancel}
              >
                Отменить
              </Button>
              <Button type='primary' size='medium' htmlType='submit'>
                Сохранить
              </Button>
            </div>
          )}

          {updateUserError && (
            <p
              className={`${commonStyles.error} pt-5 text text_type_main-default`}
            >
              {updateUserError}
            </p>
          )}
        </>
      </form>
    </main>
  );
};
