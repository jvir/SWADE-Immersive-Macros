/*******************************************
 * Fear Table Macro.
 * v. 2.0.0 by SalieriC#8263, original creator unknown.
 *******************************************/
export async function fear_table_script() {
    const dialog = new Dialog({
        title: 'Fear',
        content: '<form class="fearTable"><div class="form-group"><label>Fear Modifier</label><input type="number" name="fearModifier" /></div></form>',
        default: 'roll',
        buttons: {
            roll: {
                label: 'Roll',
                callback: (html) => {
                    let modifier = html.find('.fearTable input[name="fearModifier"]')[0].value;
    
                    if (modifier === '') {
                        modifier = 0;
                    }
                    
                    modifier = parseInt(modifier);
                    const roll = new Roll('1d20 + @mod', { mod: modifier });
                    let fearTableName = game.settings.get(
                        'swim', 'fearTable');
                        if (fearTableName) {
                            let fearTable = game.tables.getName(`${fearTableName}`)
                            if (!fearTable) {
                                ui.notifications.error("Unable to locate '" + fearTableName + "'. Please import it into the world first.")
                                return
                            } else {
                                fearTable.draw({ roll });
                            }
                        }
                        else {
                            ui.notifications.error("Please set a Fear table name in the SWIM settings.");
                            return;
                        }
                    let fearSFX = game.settings.get(
                        'swim', 'fearSFX');
                    if (fearSFX) {
                        AudioHelper.play({ src: `${fearSFX}` }, true);
                    }                
                }
            }
        },
        render: ([dialogContent]) => {
            dialogContent.querySelector(`input[name="fearModifier"`).focus();
        },
        default: "roll"
    });
    dialog.render(true);
}