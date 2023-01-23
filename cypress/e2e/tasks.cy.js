describe('tarefas', () => {



    context('cadastro', () => {
        it('Deve cadastrar uma nova tarefa', () => {
    
            const taskName = 'Ler um livro de node.js'
    
            cy.removeTaskByName(taskName)
    
            cy.createTask(taskName)
    
            cy.contains('main div p', taskName).should('be.visible')
    
        })
    
        it('Não deve permitir tarefa duplicada', () => {
    
            const taskName = 'Estudar JavaScript'
    
            cy.removeTaskByName(taskName)
    
            cy.createTask(taskName)
    
            cy.createTask(taskName)
    
    
            cy.get('.swal2-html-container').should('be.visible').should('have.text', 'Task already exists!')
        })
    
        it('Campo obrigatório', () => {
            cy.createTask()
    
            cy.isRequired('This is a required field')
        })
    })

    context('atualização', () => {
        it('Deve concluir uma tarefa', () => {
            const taskName = 'Pagar contas de consumo'
            
            cy.removeTaskByName(taskName)

            cy.createTask(taskName)

            cy.contains('p', taskName).parent().find('button[class*=ItemToggle]').click()

            cy.contains('p', taskName).should('have.css', 'text-decoration-line', 'line-through')
        })
    })

    context('exclusão', () => {
        it('Deve remover uma tarefa', () => {
            const taskName = 'Estudar JavaScript'
            
            cy.removeTaskByName(taskName)

            cy.createTask(taskName)

            cy.contains('p', taskName).parent().find('button[class*=ItemDelete]').click()

            cy.contains('p', taskName).should('not.exist')
        })
    })
})

