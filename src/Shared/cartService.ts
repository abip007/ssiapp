import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite } from 'ionic-native';

import{SqlStorage} from '../Shared/sql-storage.service';

const win: any = window;

@Injectable()
export class SSiCartService {
    //storage = new Storage(SqlStorage);
    public db: SQLite;
    public sql: SqlStorage;

    constructor(public events: Events, public storage: Storage) {
        if (win.sqlitePlugin) {
            this.sql = new SqlStorage();
        } else {
            console.warn('SQLite plugin not installed. Falling back to regular Ionic Storage.');
        }
    }

    AddtoCart(itemid, qty, itemname,price,cost,weight) {
        let item = { itemid: itemid,qty:qty, itemname: itemname, price: price,cost:cost,weight:weight };
        console.log(item);
        if (this.sql){
            this.sql.set(itemid.toString(), JSON.stringify(item)).then(data => {
                this.events.publish('favorites:changed');
            });
        } else {
            return new Promise(resolve => {
                this.storage.set(itemid.toString(), JSON.stringify(item)).then(() => {
                    this.events.publish('favorites:changed');
                    resolve();
                });
            });
        }
    }

    unfavoriteTeam(team) {
        if (this.sql){
            this.sql.remove(team.id.toString()).then(data => {
                this.events.publish('favorites:changed');
            });
        } else {
            return new Promise(resolve => {
                this.storage.remove(team.id.toString()).then(() => {
                    this.events.publish('favorites:changed');
                    resolve();
                });
            });
        }
    }

    isFavoriteTeam(teamId) {
        if (this.sql){
            return this.sql.get(teamId.toString()).then(value => value ? true : false);
        } else {
            return new Promise(resolve => resolve(this.storage.get(teamId.toString()).then(value => value ? true : false)));
        }
    }

    getAllFavorites(){
        if (this.sql){
            return this.sql.getAll();
        } else {
            return new Promise(resolve => {
                let results = [];
                this.storage.forEach(data => {
                    results.push(JSON.parse(data));
                });
                return resolve(results);
            });
        }
    }

    initStorage(){
        if (this.sql){
            return this.sql.initializeDatabase();
        } else {
            return new Promise(resolve => resolve());
        }
    }
}