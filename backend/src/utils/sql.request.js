
const Select = (db,table)=> db.query(`select * from ${table}`);

const SelectByColumn = (db,table,columns,value) => db.query(`select * from ${table} where ${columns}=?`,[value]);

const Delete = (db,table,id_c,id) => db.query(`delete from ${table} where ${id_c}=?`,[id]);

const Insert = (db,table,columns=[],values={})=>{
    let val_len = 0;
    for (elt in values) {val_len = val_len + 1}
    if (columns.length != val_len){
        throw new Error('il doit y avoir autant de colonnes que de valeurs');
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

const Update = (db,table,columns=[],id_c,id,values={})=>{
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

const UpdateBycolumns = (db,table,columns=[],id_c=[],id=[],values={})=>{
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
            cmd = cmd + `${columns[index]}=? where ${condition(id_c)}=?`;
        }
    }
    list_value = [...list_value,...id];
    db.query(cmd,list_value);

}
//let val = {nom:'BG',tel:'tel',mdp:'mdp',ville:'ville'}
//Update('db','vendeur',['nom_vend','tel_vend','mdp_vend','ville_vend'],'id_vend',4,val)
module.exports = {Select, SelectByColumn, Delete, Insert, Update, UpdateBycolumns};

function to_list(dict={}){
    let list = [];
    for (elt in dict){
        list.push(dict[elt]);
    }
    return list;
}