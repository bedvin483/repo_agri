
const Select = (db,table)=> db.query(`select * from ${table}`);

const SelectByColumn = (db,table,column='',value='') => db.query(`select * from ${table} where ${column}=?`,[value]);

const Delete = (db,table,id_c='',id=0) => db.query(`delete from ${table} where ${id_c}=?`,[id]);

const DeleteByColumns = (db,table,id_table=[],id=[])=>{
    let condition = ``;
    for (let i=0;i<id_table.length;i++){
        if (i < id_table.length - 1){
            condition = condition + `${id_table[i]}=? and `;
        }
        else{
            condition = condition + `${id_table[i]}=?`;
        }
    }
    db.query(`delete from ${table} where ${condition}`,id);
}
const Insert = (db,table,columns=[],values={})=>{
    let val_len = 0;
    for (elt in values) {val_len = val_len + 1}
    if (columns.length != val_len){
        throw {status:400,message:'il doit y avoir autant de colonnes que de valeurs'};
    }
    let list_columns = `(`;
    let lenght = columns.length -1
    for (let index=0;index<=lenght;index++) {
        if (index < lenght){
            list_columns = list_columns + `${columns[index]},`;
        }
        else{
            list_columns = list_columns + `${columns[index]})`;
        }
    }
    let cmd = `insert into ${table}${list_columns} value(`;
    for (let index in columns){
        index < lenght ? cmd = cmd + `?,` : cmd = cmd + `?)`;
    }
    let list_value = to_list(values);
    db.query(cmd,list_value);
}

const Update = (db,table,columns=[],id_c='',id=0,values={})=>{
    let list_value = to_list(values);
    if (columns.length != list_value.length){
        throw new Error('il doit y avoir autant de colonnes que de valeurs');
    }
    let lenght = columns.length-1;
    let cmd = `update ${table} set `;
    for (let index=0;index<=lenght;index++) {
        if (index < lenght){
            cmd = cmd + `${columns[index]}=?, `;
        }
        else{
            cmd = cmd + `${columns[index]}=? where ${id_c}=?`;
        }
    }
    list_value.push(id);
    db.query(cmd,list_value);

}

const UpdateBycolumns = (db,table,columns=[],id_c=[],id_value=[],values={})=>{
    const condition = (col=[])=>{
        if (col.length==1){
            return `${col[0]}=?`;
        }
        let cdt = ``;
        for (let i=0;i<col.length;i++){
            if (i<col.length-1){
                cdt = cdt + `${col[i]}=? and`;
            }
            else{
                cdt = cdt + ` ${col[i]}=?`
            }
        }
        return cdt;
    }
    let list_value = to_list(values);
    if (columns.length != list_value.length){
        throw new Error('il doit y avoir autant de colonnes que de valeurs');
    }
    let lenght = columns.length-1;
    let cmd = `update ${table} set `;
    for (let index=0;index<=lenght;index++) {
        if (index < lenght){
            cmd = cmd + `${columns[index]}=?, `;
        }
        else{
            cmd = cmd + `${columns[index]}=? where ${condition(id_c)}`;
        }
    }
    list_value = [...list_value,...id_value];
    db.query(cmd,list_value);

}
//let val = {nom:'BG',tel:'tel',mdp:'mdp',ville:'ville'}
//DeleteByColumns('db','vendeur',['id_vend','id_produit'],['3',4])
module.exports = {Select, SelectByColumn, Delete, DeleteByColumns, Insert, Update, UpdateBycolumns};

function to_list(dict={}){
    let list = [];
    for (elt in dict){
        list.push(dict[elt]);
    }
    return list;
}