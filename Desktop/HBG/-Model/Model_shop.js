
export function acheterUnite(Tabunits,F,choix) {
    const u = Tabunits[choix];
    if (F >= u.cout) {
        F -= u.cout;
        u.nombre++;
        u.cout = Math.floor(u.cout * 1.15);
        return F;
    }else{
        console.log("No money");
        return F;
    }
}

