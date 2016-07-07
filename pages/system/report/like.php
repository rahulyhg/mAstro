<? if (in_array($u, $pDislikesAr)) rmFromCol('data', 'id', $iid, 'dislikes');
if (!in_array($u, $pLikesAr)) pushToCol('data', 'id', $iid, 'likes');
else rmFromCol('data', 'id', $iid, 'likes');
