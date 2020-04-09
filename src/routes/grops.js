const Router = require('express').Router;

const Student = require('../db/models/student').default;
const Group = require('../db/models/group').default;

const groupRoutes = Router();

groupRoutes.get('/:id?', async (req, res) => {
    const { id } = req.params;
    if (!id){
    let group = await Group.findAll();

    if (!group) {
        res.statusCode = 400;
        return res.end('No students found');
    }

    group = group.map(group => group.toJSON());

    res.statusCode = 200;
    return res.json({
        group})

}else{
        const group = await Group.findOne({ where: { id } });

        if (!group) {
            res.statusCode = 404;
            return res.end(`Group with id: ${id} was not found`);
        }
        let findGroup = {
            groupId: 2
        }

        let students = await Student.findAll({ where: findGroup});

        if (!students) {
            res.statusCode = 400;
            return res.end('No students found');
        }

        students = students.map(student => student.toJSON());

        res.statusCode = 200;
        return res.json({
            students,
        })
    }})



groupRoutes.post('/', async (req, res) => {
    if (!req.body) {
        res.statusCode = 400;
        return res.end('Body is required');
    }

    const { name } = req.body;

    if (!name) {
        res.statusCode = 400;
        return res.end('Args are invalid');
    }
    let findGroup = {
        name: name
    }

    let group = await Group.findOne({ where: findGroup});

    if (!group) {
        const createdGroup = await Group.create({name});
        res.statusCode = 200;
        res.json({
            student: {
                ...(createdGroup.toJSON()),
                group: (await createdGroup).toJSON()
            }
        })
    }else{
            res.statusCode = 400;
            return res.end(`${name} already exists`);
    }



    });

groupRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.statusCode = 400;
        return res.end('ID is required');
    }

    const group = await Group.findByPk(id);

    if (!group) {
        res.statusCode = 400;
        return res.end(`Group with id: ${id} was not found`);
    }

    await Group.destroy({
        where: {
            id
        }
    });

    let findGroup = {
        groupId: id
    }

    let students = await Student.findAll({ where: findGroup});

    res.statusCode = 200;
    return res.json({
        group: group.toJSON()
    });
});

module.exports = groupRoutes;
