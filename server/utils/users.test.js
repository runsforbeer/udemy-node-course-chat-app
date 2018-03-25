const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Don',
      room: 'My Den'
    }, {
      id: 2,
      name: 'Cindy',
      room: 'The Kitchen'
    }, {
      id: 3,
      name: 'Ursule',
      room: 'My Den'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Don',
      room: 'My den'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var testUser = users.users[0];
    var removedUser = users.removeUser(testUser.id);
    expect(removedUser).toInclude(testUser);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = 99;
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should get user', () => {
    var userId = 2;
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = 22;
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });

  it('should return names for My Den', () => {
    var userList = users.getUserList('My Den');
    expect(userList).toEqual(['Don','Ursule']);
  });

  it('should return names for Kitchen', () => {
    var userList = users.getUserList('The Kitchen');
    expect(userList).toEqual(['Cindy']);
  });

});
