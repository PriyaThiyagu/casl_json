const roleData = [
  {
    id: 1,
    user_id: 1,
    role: 'Admin',
    permissions: JSON.stringify ([
    {
      name: 'admin',
      action: 'create',
      subject: 'all'
    },
    {
      name: 'admin',
      action: 'read',
      subject: 'all'
    },
    {
      name: 'admin',
      action: 'update',
      subject: 'all'
    },
    {
      name: 'admin',
      action: 'delete',
      subject: 'User',
      inverted: 'true'
    }
  ]),
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    user_id: 2,
    role: 'User',
    permissions:JSON.stringify([
      {
        name: 'user',
        action: 'create',
        subject: 'Post'
      },
      {
        name: 'user',
        action: 'read',
        subject: 'Post'
      },
      {
        name: 'user',
        action: 'update',
        subject: 'Post',
        conditions:{user_id:1}
      },
      {
        name: 'user',
        action: 'delete',
        subject: 'Post',
        inverted: 'true'
      }
    ]),
    created_at: new Date(),
    updated_at: new Date()
  }
];

export default roleData;