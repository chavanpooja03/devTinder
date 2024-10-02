List of APis
# auth Router
 -1.POST/signUp
 -2.POST/login
 -3.POST/logout

# profile Router
 -1.GET/profile/view
 -2.POST/profile/edit
 -3.PATCH/profile/password

# connection Request Router
 -1.POST/request/send/integrated/:userId
 -2.POST/request/send/ignored/:userId
 -3.POST/request/review/accepted/:requestId
 -4.POST/request/review/rejected/:requestId

# user Router
-1.GET/userConnection
-2.GET/userRequests
-3.GET/user/feed -GEt the profile of other users
