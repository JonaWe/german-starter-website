import { useEffect, useState } from 'react';

import { Ring } from '@uiball/loaders';
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { ACCESS_ROLES, RoleId } from '../../../../data/AccessRoles';
import { db } from '../../../../firebase/clientApp';
import changeRole from '../../../../lib/changeRole';
import Button from '../../../UI/Button';
import SimpleListbox from '../../../UI/Listbox/SimpleListbox';

interface RoleOption {
  id: string;
  name: string;
}

export default function ChangeRoleButton({ uid }: { uid: string }) {
  const roleOptions = Object.entries(ACCESS_ROLES).map(([key, role]) => {
    return {
      id: role.id,
      name: role.name,
    };
  });

  const selectedUserRef = doc(db, 'users', uid);
  const [selectedUserData] = useDocumentData(selectedUserRef);

  const defaultRoleId = 'user';

  const defaultRole = roleOptions.find((r) => r.id === defaultRoleId);

  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);

  const [savedRole, setSavedRole] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    if (uid && selectedRole) changeRole(uid, selectedRole.id as RoleId);
  };

  useEffect(() => {
    const role = {
      id: ACCESS_ROLES[(selectedUserData?.role as RoleId) || defaultRoleId].id,
      name: ACCESS_ROLES[(selectedUserData?.role as RoleId) || defaultRoleId]
        .name,
    };
    setSelectedRole(role);
    setSavedRole(role);
    setLoading(false);
  }, [selectedUserData]);

  return (
    <div className="flex items-center gap-3">
      <div className="w-52">
        <SimpleListbox
          options={roleOptions}
          selected={selectedRole || (defaultRole as RoleOption)}
          setSelected={(role) => setSelectedRole(role)}
        />
      </div>
      {selectedRole && selectedRole.id !== savedRole.id && (
        <Button text="Save" onClick={handleSave} disabled={loading}>
          {loading && <Ring color="#ffffff" size={20} />}
        </Button>
      )}
    </div>
  );
}
