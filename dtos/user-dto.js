export default class UserDto {
    username;
    id;
    roles;

    constructor(model) {
        this.id = model._id;
        this.username = model.username
        this.roles = model.roles;
    }
}