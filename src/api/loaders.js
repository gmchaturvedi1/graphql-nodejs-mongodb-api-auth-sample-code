const DataLoader = require('dataloader')
const { reposForOrg } = require('./github')
const _ = require('lodash')

// const quizQuestionLoader = () => {
//     return new DataLoader(projectIds => {
//         return result.model
//             .find({ _id: { $in: projectIds } })
//             .exec()
//             .then(projects => {
//                 console.log('projects loader batch: ', projectIds.length)
//                 const projectsById = _.keyBy(projects, '_id')
//                 return projectIds.map(projectId => projectsById[projectId])
//             })
//     })
// }

// const questionDetailLoader = () => {
//     return new DataLoader(projectIds => {
//         console.log(projectIds)
//         return qbank.model
//             .find({ _id: { $in: projectIds } })
//             .exec()
//             .then(projects => {
//                 console.log('projects loader batch: ', projectIds.length)
//                 const projectsById = _.keyBy(projects, '_id')
//                 return projectIds.map(projectId => projectsById[projectId])
//             })
//     })
// }

const createTaskLoader = () => {
    return new DataLoader(taskIds => {
        return Task.find({ _id: { $in: taskIds } })
            .exec()
            .then(tasks => {
                console.log('task loader batch: ', taskIds.length)
                const tasksById = _.keyBy(tasks, '_id')
                return taskIds.map(taskId => tasksById[taskId])
            })
    })
}

const createGitHubLoader = () => {
    return new DataLoader(repoNames => {
        return reposForOrg().then(repos => {
            console.log('github loader batch: ', repoNames.length)
            const reposByName = _.keyBy(repos, 'name')
            return repoNames.map(repoName => reposByName[repoName])
        })
    })
}

module.exports = () => {
    return {
        // quizQuestionLoader: quizQuestionLoader(),
        // questionDetailLoader: questionDetailLoader(),
        task: createTaskLoader(),
        repo: createGitHubLoader(),
    }
}
