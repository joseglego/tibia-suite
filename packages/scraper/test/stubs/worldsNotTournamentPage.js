module.exports = `
<!DOCTYPE html>
<html>
  <body>
    <div id="worlds" class="Box">
      <div class="TableContentContainer">Overal Maxium</div>
      <div class="TableContentContainer">Regular Worlds</div>
      <div class="TableContentContainer">
        <table class="TableContent" width="100%" style="border:1px solid #faf0d7;">
          <tr class="LabelH"><td>World</td><td>Online</td><td>Location</td><td>PvP Type</td><td>BattlEye</td><td>Additional Information</td></tr>
          <tr class="Odd"><td style="width: 150px;"><a href="https://www.tibia.com/community/?subtopic=worlds&world=Antica">Antica</a></td><td style="text-align: right;">700</td><td>Europe</td><td>Open PvP</td><td align="center" valign="middle"> <span style="width: 18px; height: 18px;"><a href="../common/help.php?subtopic=battleye" target="_blank"><span class="HelperDivIndicator" onMouseOver="ActivateHelperDiv($(this), 'BattlEye Protected Game World', '<p>On this game world, BattlEye blocks cheats from the game. The game world has been protected by BattlEye since August 29, 2017.</p>', '');" onMouseOut="$('#HelperDivContainer').hide();"><img style="border:0px;" src="https://static.tibia.com/images/global/content/icon_battleye.gif" /></span></a></span></td><td></td></tr>
          <tr class="Even"><td style="width: 150px;"><a href="https://www.tibia.com/community/?subtopic=worlds&world=Unica">Unica</a></td><td style="text-align: right;">140</td><td>Europe</td><td>Retro Open PvP</td><td align="center" valign="middle"></td><td>premium, blocked</td></tr>
          <tr class="Odd"><td style="width: 150px;"><a href="https://www.tibia.com/community/?subtopic=worlds&world=Venebra">Venebra</a></td><td style="text-align: right;">311</td><td>South America</td><td>Optional PvP</td><td align="center" valign="middle"> <span style="width: 18px; height: 18px;"><a href="../common/help.php?subtopic=battleye" target="_blank"><span class="HelperDivIndicator" onMouseOver="ActivateHelperDiv($(this), 'BattlEye Protected Game World', '<p>On this game world, BattlEye blocks cheats from the game. The game world has been protected by BattlEye since its release.</p><p>You can only move to a game world initially protected by BattlEye if your character also comes from a game world which has been protected right from its release.</p>', '');" onMouseOut="$('#HelperDivContainer').hide();"><img style="border:0px;" src="https://static.tibia.com/images/global/content/icon_battleyeinitial.gif" /></span></a></span></td><td></td></tr>
        </table>
      </div>
    </div>
  </body>
</html>
`
