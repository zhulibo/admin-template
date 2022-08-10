describe('登录到首页', () => {
  it('点击登录按钮', () => {
    cy.visit('/login')
    cy.get('.el-button').click()
    cy.url().should('include','dashboard')
    cy.contains('新闻').click()
    cy.contains('新闻列表').click()
    cy.contains('新增').should('be.visible')
  })
})
