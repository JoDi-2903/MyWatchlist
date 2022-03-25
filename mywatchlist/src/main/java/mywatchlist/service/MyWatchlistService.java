package mywatchlist.service;

import mywatchlist.repository.TitleTypeRepo;
import mywatchlist.repository.UserAccountRepo;
import mywatchlist.repository.WatchlistEntryRepo;
import mywatchlist.repository.WatchlistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyWatchlistService {

    private final UserAccountRepo userAccountRepo;
    private final TitleTypeRepo titleTypeRepo;
    private final WatchlistEntryRepo watchlistEntryRepo;
    private final WatchlistRepo watchlistRepo;

    @Autowired
    public MyWatchlistService(UserAccountRepo userAccountRepo, TitleTypeRepo titleTypeRepo,
                              WatchlistEntryRepo watchlistEntryRepo, WatchlistRepo watchlistRepo) {
        this.userAccountRepo = userAccountRepo;
        this.titleTypeRepo = titleTypeRepo;
        this.watchlistEntryRepo = watchlistEntryRepo;
        this.watchlistRepo = watchlistRepo;
    }


    public void getUsers(long id) {
        userAccountRepo.getById(id);
    }


}
