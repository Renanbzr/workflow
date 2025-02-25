/* eslint-disable no-unused-expressions */
import { after } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import db from '../../db/dbconfig.js';

chai.use(chaiHttp);
const { expect } = chai;

after(async () => {
  await db.destroy();
});

describe('GET em /autores', () => {
  it('Deve retornar uma lista de autores', (done) => {
    chai.request(app)
      .get('/autores')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('nome');
        expect(res.body[0]).to.have.property('nacionalidade');
        done();
      });
  });

  it('Deve retornar um autor', (done) => {
    const idAutor = 1;
    chai.request(app)
      .get(`/autores/${idAutor}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('nome');
        expect(res.body).to.have.property('nacionalidade');
        done();
      });
  });

  it('Não deve retornar um autor com id inválido', (done) => {
    const idAutor = 'A';
    chai.request(app)
      .get(`/autores/${idAutor}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message')
          .eql(`id ${idAutor} não encontrado`);
        done();
      });
  });
  

  it('Deve retornar uma lista de Livros', (done) => {
    const autorId = 1;
    chai.request(app)
      .get(`/autores/${autorId}/livros`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('autor')
        expect(res.body).to.have.property('livros')
        expect(res.body.livros).to.be.an('array')
        done();
      });
  }
)

 it('Deve retornar uma lista de Livros vazia', (done) => {
  const autorId = 4;
  chai.request(app)
    .get(`/autores/${autorId}/livros`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('autor');
      expect(res.body).to.have.property('livros');
      expect(res.body.livros).to.be.an('array').that.is.empty;
      done();
    });
}
);

it('Não deve retornar uma lista de livros com autor inválido', (done) => {
  const autorId = 999;
  chai.request(app)
    .get(`/autores/${autorId}/livros`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message')
        .eql(`id ${autorId} não foi encontrado`)
      done();
    });
}
);

});

describe('POST em /autores', () => {
  it('Deve criar umnovo autor', (done) => {
    const autor = {
      nome: 'Teste Testinho',
      acionalidade: 'Testelândia',
    };
    chai.request(app)
      .post('/autores')
      .set('Accept, 'application/json')
      .send(autor)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.hav.property('message')
          .eql(autor criado');  
        dne();
     });
 });

  it('Não deve criar m autor ao receber body vazio', (done) => {
    const autor = {};
    chai.request(app)
      .post('/autores')
      .set('Accept, 'application/json')
      .send(autor)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('mssage')
          .eql(corpo da requisição vazio');
        dne();
     });
  };
);
});

describe('PUT em /autores', () => {
  it('Deve atualizar u autor', (done) => {
    const idAutor = 2;
    const autorAtualizado= {
      nome: 'Outro Nome',
      acionalidade: 'Tangamandápio',
    };
    chai.request(app)
      .put(`/autores/${idAutor}`)
      .set('Accept', 'appliction/json')
      .send(autorAtualizad)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.content[0]).t.include({
          nome: autorAtualizado.nome,
          ncionalidade: autorAtualizado.nacionalidade,
        });
        dne();
     });
 });

  it('Não deve atualizarum autor com id inválido', (done) => {
    const idAutor = 'A';
    const autorAtualizado = {
      ame: 'Atualizando Novamente',
    };
    chai.request(app)
      .put(`/autores/${idAutor}`)
      .set('Accept', 'appliction/json')
      .send(autorAtualizad)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('messge')
          .eql(id ${idAutor} não encontrado`);
        dne();
     });
  };
);

describe('DELETE em /autores', () => {
  it('Deve deletar um utor', (done) => {
    const idAutor = 4
    chai.request(app)
      .delete(`/autores/${idAutor}`)
      .set('Accept', 'applcation/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.roperty('message')
          .eql(autor excluído');
        dne();
     });
 });

  it('Não deve deletar u autor com id inválido', (done) => {
    const idAutor = '';
    chai.request(app)
      .delete(`/autores/${idAutor}`)
      .set('Accept', 'applcation/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message')
          .eql(Autor com id ${idAutor} não encontrado`);
        dne();
     });
  };
});
