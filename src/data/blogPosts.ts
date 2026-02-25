export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'blockquote' | 'image' | 'subheading';
  content: string;
  language?: string;
  items?: string[];
  alt?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  dateISO: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  coverImage: string;
  tableOfContents: { id: string; title: string; level: number }[];
  content: ContentBlock[];
}

const author = {
  name: 'MobileDev',
  avatar: 'https://d64gsuwffb70l.cloudfront.net/699f57cd70001204b5f3365d_1772050738814_4da26ed6.jpg',
  role: 'Senior Mobile Engineer',
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'mvi-vs-mvvm-jetpack-compose',
    title: 'Why I Chose MVI Over MVVM for Jetpack Compose',
    excerpt: 'A deep dive into architectural patterns for modern Android development and how MVI\'s unidirectional data flow simplifies complex UI states in Jetpack Compose applications.',
    category: 'Architecture',
    tags: ['Kotlin', 'Jetpack Compose', 'MVI', 'MVVM', 'Android', 'Architecture'],
    date: 'February 15, 2026',
    dateISO: '2026-02-15',
    readTime: '8 min read',
    author,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    tableOfContents: [
      { id: 'the-problem', title: 'The Problem with MVVM in Compose', level: 2 },
      { id: 'what-is-mvi', title: 'What is MVI?', level: 2 },
      { id: 'state-management', title: 'State Management Comparison', level: 2 },
      { id: 'implementation', title: 'MVI Implementation in Compose', level: 2 },
      { id: 'side-effects', title: 'Handling Side Effects', level: 2 },
      { id: 'testing', title: 'Testing Benefits', level: 2 },
      { id: 'conclusion', title: 'When to Choose What', level: 2 },
    ],
    content: [
      { type: 'paragraph', content: 'After shipping three production Android apps with Jetpack Compose, I\'ve settled on MVI (Model-View-Intent) as my go-to architecture pattern. This wasn\'t an overnight decision — it came from real pain points I experienced with MVVM in complex, state-heavy screens. Let me walk you through my reasoning and show you practical implementations.' },
      { type: 'heading', content: 'The Problem with MVVM in Compose' },
      { type: 'paragraph', content: 'MVVM has been the de facto standard for Android development since the introduction of Architecture Components. It works beautifully with XML-based views and LiveData. But when I started building complex screens in Compose — screens with multiple loading states, form validations, and real-time updates — I hit a wall.' },
      { type: 'paragraph', content: 'The core issue? **State explosion.** In MVVM, each piece of state typically lives in its own StateFlow or LiveData. When you have 8-10 observable fields in a ViewModel, reasoning about the current state of your screen becomes incredibly difficult.' },
      { type: 'code', language: 'kotlin', content: `// MVVM approach - state is scattered
class ProfileViewModel : ViewModel() {
    private val _user = MutableStateFlow<User?>(null)
    private val _isLoading = MutableStateFlow(false)
    private val _error = MutableStateFlow<String?>(null)
    private val _isEditing = MutableStateFlow(false)
    private val _formName = MutableStateFlow("")
    private val _formEmail = MutableStateFlow("")
    private val _isSaving = MutableStateFlow(false)
    private val _saveSuccess = MutableStateFlow(false)
    
    // Which combination of these states is valid?
    // Can isLoading and error both be true?
    // What happens when isSaving and isEditing conflict?
}` },
      { type: 'blockquote', content: 'When you have N boolean states, you have 2^N possible combinations. Most of those combinations are invalid, but nothing in MVVM prevents them from occurring.' },
      { type: 'heading', content: 'What is MVI?' },
      { type: 'paragraph', content: 'MVI (Model-View-Intent) is a unidirectional data flow architecture where the entire screen state is represented by a single immutable data class. User actions are modeled as "Intents" that flow into a reducer, which produces a new state. This creates a predictable, testable state machine.' },
      { type: 'paragraph', content: 'The key principles are:' },
      { type: 'list', content: '', items: [
        'Single source of truth: One state object represents the entire screen',
        'Unidirectional data flow: Intent → Reducer → State → UI',
        'Immutable state: New state is always a copy, never mutated',
        'Pure reducers: Given the same state and intent, always produce the same result',
      ]},
      { type: 'heading', content: 'State Management Comparison' },
      { type: 'paragraph', content: 'Here\'s the same profile screen modeled with MVI. Notice how impossible states become impossible to represent:' },
      { type: 'code', language: 'kotlin', content: `// MVI approach - state is unified and type-safe
sealed class ProfileState {
    object Loading : ProfileState()
    data class Error(val message: String) : ProfileState()
    data class Loaded(
        val user: User,
        val isEditing: Boolean = false,
        val formState: FormState? = null,
        val isSaving: Boolean = false,
    ) : ProfileState()
}

data class FormState(
    val name: String,
    val email: String,
    val nameError: String? = null,
    val emailError: String? = null,
)

sealed class ProfileIntent {
    object LoadProfile : ProfileIntent()
    object StartEditing : ProfileIntent()
    object CancelEditing : ProfileIntent()
    data class UpdateName(val name: String) : ProfileIntent()
    data class UpdateEmail(val email: String) : ProfileIntent()
    object SaveProfile : ProfileIntent()
}` },
      { type: 'paragraph', content: 'With this approach, it\'s literally impossible to be in a "loading" state while also "editing" — the type system prevents it. This is a massive win for complex screens.' },
      { type: 'heading', content: 'MVI Implementation in Compose' },
      { type: 'paragraph', content: 'Here\'s how I typically structure an MVI ViewModel with Jetpack Compose:' },
      { type: 'code', language: 'kotlin', content: `class ProfileViewModel(
    private val userRepository: UserRepository
) : ViewModel() {
    
    private val _state = MutableStateFlow<ProfileState>(ProfileState.Loading)
    val state: StateFlow<ProfileState> = _state.asStateFlow()
    
    private val _effects = Channel<ProfileEffect>(Channel.BUFFERED)
    val effects: Flow<ProfileEffect> = _effects.receiveAsFlow()
    
    fun onIntent(intent: ProfileIntent) {
        when (intent) {
            is ProfileIntent.LoadProfile -> loadProfile()
            is ProfileIntent.StartEditing -> startEditing()
            is ProfileIntent.UpdateName -> updateName(intent.name)
            is ProfileIntent.SaveProfile -> saveProfile()
            // ... other intents
        }
    }
    
    private fun loadProfile() {
        viewModelScope.launch {
            _state.value = ProfileState.Loading
            userRepository.getProfile()
                .onSuccess { user ->
                    _state.value = ProfileState.Loaded(user = user)
                }
                .onFailure { error ->
                    _state.value = ProfileState.Error(error.message ?: "Unknown error")
                }
        }
    }
    
    private fun saveProfile() {
        val current = _state.value as? ProfileState.Loaded ?: return
        val form = current.formState ?: return
        
        _state.value = current.copy(isSaving = true)
        
        viewModelScope.launch {
            userRepository.updateProfile(form.name, form.email)
                .onSuccess {
                    _state.value = current.copy(
                        isSaving = false,
                        isEditing = false,
                        formState = null
                    )
                    _effects.send(ProfileEffect.ShowToast("Profile saved!"))
                }
                .onFailure { error ->
                    _state.value = current.copy(isSaving = false)
                    _effects.send(ProfileEffect.ShowToast(error.message ?: "Save failed"))
                }
        }
    }
}` },
      { type: 'heading', content: 'Handling Side Effects' },
      { type: 'paragraph', content: 'One of the trickiest parts of any architecture is handling one-time events (navigation, toasts, dialogs). In MVI, I use a separate Channel for side effects:' },
      { type: 'code', language: 'kotlin', content: `sealed class ProfileEffect {
    data class ShowToast(val message: String) : ProfileEffect()
    object NavigateBack : ProfileEffect()
    data class NavigateToSettings(val userId: String) : ProfileEffect()
}

// In Composable
@Composable
fun ProfileScreen(viewModel: ProfileViewModel = hiltViewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    
    LaunchedEffect(Unit) {
        viewModel.effects.collect { effect ->
            when (effect) {
                is ProfileEffect.ShowToast -> { /* show snackbar */ }
                is ProfileEffect.NavigateBack -> { /* pop back stack */ }
                is ProfileEffect.NavigateToSettings -> { /* navigate */ }
            }
        }
    }
    
    when (val s = state) {
        is ProfileState.Loading -> LoadingScreen()
        is ProfileState.Error -> ErrorScreen(s.message) {
            viewModel.onIntent(ProfileIntent.LoadProfile)
        }
        is ProfileState.Loaded -> ProfileContent(
            state = s,
            onIntent = viewModel::onIntent
        )
    }
}` },
      { type: 'heading', content: 'Testing Benefits' },
      { type: 'paragraph', content: 'The biggest practical benefit of MVI is testability. Since your reducer is essentially a pure function (state + intent = new state), testing becomes trivial:' },
      { type: 'code', language: 'kotlin', content: `@Test
fun \`when save profile succeeds, editing mode is disabled\`() = runTest {
    // Given
    val viewModel = ProfileViewModel(FakeUserRepository(shouldSucceed = true))
    viewModel.onIntent(ProfileIntent.LoadProfile)
    viewModel.onIntent(ProfileIntent.StartEditing)
    viewModel.onIntent(ProfileIntent.UpdateName("New Name"))
    
    // When
    viewModel.onIntent(ProfileIntent.SaveProfile)
    advanceUntilIdle()
    
    // Then
    val state = viewModel.state.value as ProfileState.Loaded
    assertFalse(state.isEditing)
    assertNull(state.formState)
    assertFalse(state.isSaving)
}` },
      { type: 'heading', content: 'When to Choose What' },
      { type: 'paragraph', content: 'MVI isn\'t always the right choice. Here\'s my decision framework:' },
      { type: 'list', content: '', items: [
        'Choose MVVM when: Simple screens with 1-3 state fields, CRUD operations, rapid prototyping',
        'Choose MVI when: Complex screens with many interdependent states, forms with validation, real-time data, screens where invalid state combinations are possible',
        'Consider Redux-style when: Shared state across multiple screens, time-travel debugging needs, very large applications with complex state graphs',
      ]},
      { type: 'paragraph', content: 'The beauty of Jetpack Compose is that it works well with both patterns. The key is choosing based on your screen\'s complexity, not dogma. For my production apps, about 70% of screens use MVI and 30% use simpler MVVM — and that\'s perfectly fine.' },
      { type: 'blockquote', content: 'Architecture should serve the developer, not the other way around. Pick the right tool for the complexity at hand.' },
    ],
  },
  {
    slug: 'flutter-offline-first-architecture',
    title: 'Building Offline-First Apps with Flutter & Drift',
    excerpt: 'How to implement a robust offline-first architecture with conflict resolution and background sync in Flutter applications using Drift (formerly Moor) database.',
    category: 'Flutter',
    tags: ['Flutter', 'Dart', 'Drift', 'Offline-First', 'Architecture', 'Database'],
    date: 'January 28, 2026',
    dateISO: '2026-01-28',
    readTime: '12 min read',
    author,
    coverImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=600&fit=crop',
    tableOfContents: [
      { id: 'why-offline-first', title: 'Why Offline-First Matters', level: 2 },
      { id: 'architecture-overview', title: 'Architecture Overview', level: 2 },
      { id: 'drift-setup', title: 'Setting Up Drift', level: 2 },
      { id: 'sync-engine', title: 'Building the Sync Engine', level: 2 },
      { id: 'conflict-resolution', title: 'Conflict Resolution Strategies', level: 2 },
      { id: 'background-sync', title: 'Background Sync with WorkManager', level: 2 },
      { id: 'testing-offline', title: 'Testing Offline Scenarios', level: 2 },
    ],
    content: [
      { type: 'paragraph', content: 'Users don\'t care about your server\'s uptime. They care about being able to use your app on a subway, in a rural area, or when their WiFi drops. Building offline-first isn\'t just a nice-to-have — it\'s a fundamental UX requirement for any serious mobile app. Here\'s how I architect offline-first Flutter apps using Drift.' },
      { type: 'heading', content: 'Why Offline-First Matters' },
      { type: 'paragraph', content: 'In my experience building apps like Push Doctor and Smile Member, network reliability is never guaranteed. Even in urban areas, users frequently experience:' },
      { type: 'list', content: '', items: [
        'Spotty connections in elevators, subways, and buildings',
        'Slow 2G/3G connections in developing regions',
        'WiFi dead zones in large buildings',
        'Complete offline scenarios during flights or remote travel',
      ]},
      { type: 'paragraph', content: 'An offline-first app treats the local database as the source of truth and syncs with the server when connectivity is available. This inverts the traditional approach where the server is primary.' },
      { type: 'heading', content: 'Architecture Overview' },
      { type: 'paragraph', content: 'The architecture follows a layered approach with clear separation of concerns:' },
      { type: 'code', language: 'text', content: `┌─────────────────────────────────────────┐
│              UI Layer (Widgets)          │
├─────────────────────────────────────────┤
│           BLoC / State Management       │
├─────────────────────────────────────────┤
│             Repository Layer            │
│   ┌──────────────┬──────────────────┐   │
│   │ Local Source  │  Remote Source   │   │
│   │   (Drift)    │  (REST/GraphQL)  │   │
│   └──────────────┴──────────────────┘   │
├─────────────────────────────────────────┤
│            Sync Engine                  │
│   ┌──────────────┬──────────────────┐   │
│   │  Queue Mgr   │ Conflict Resolver│   │
│   └──────────────┴──────────────────┘   │
└─────────────────────────────────────────┘` },
      { type: 'heading', content: 'Setting Up Drift' },
      { type: 'paragraph', content: 'Drift (formerly Moor) is a reactive persistence library for Flutter that generates type-safe code from your table definitions. Here\'s a basic setup for our offline-first architecture:' },
      { type: 'code', language: 'dart', content: `// database/tables.dart
class Tasks extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get title => text().withLength(min: 1, max: 200)();
  TextColumn get description => text().nullable()();
  BoolColumn get isCompleted => boolean().withDefault(const Constant(false))();
  DateTimeColumn get createdAt => dateTime()();
  DateTimeColumn get updatedAt => dateTime()();
  
  // Sync metadata
  TextColumn get remoteId => text().nullable()();
  IntColumn get syncStatus => intEnum<SyncStatus>()();
  DateTimeColumn get lastSyncedAt => dateTime().nullable()();
}

enum SyncStatus {
  synced,     // In sync with server
  pending,    // Local changes not yet pushed
  conflict,   // Conflict detected during sync
  deleted,    // Marked for deletion on next sync
}` },
      { type: 'code', language: 'dart', content: `// database/app_database.dart
@DriftDatabase(tables: [Tasks])
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());
  
  @override
  int get schemaVersion => 1;
  
  // Watch all tasks reactively
  Stream<List<Task>> watchAllTasks() {
    return (select(tasks)
      ..where((t) => t.syncStatus.isNotValue(SyncStatus.deleted.index))
      ..orderBy([(t) => OrderingTerm.desc(t.createdAt)])
    ).watch();
  }
  
  // Get all pending changes for sync
  Future<List<Task>> getPendingChanges() {
    return (select(tasks)
      ..where((t) => t.syncStatus.equals(SyncStatus.pending.index))
    ).get();
  }
  
  // Mark task as synced
  Future<void> markAsSynced(int id, String remoteId) {
    return (update(tasks)..where((t) => t.id.equals(id)))
      .write(TasksCompanion(
        remoteId: Value(remoteId),
        syncStatus: Value(SyncStatus.synced.index),
        lastSyncedAt: Value(DateTime.now()),
      ));
  }
}` },
      { type: 'heading', content: 'Building the Sync Engine' },
      { type: 'paragraph', content: 'The sync engine is the heart of the offline-first architecture. It manages a queue of pending operations and processes them when connectivity is available:' },
      { type: 'code', language: 'dart', content: `class SyncEngine {
  final AppDatabase _db;
  final ApiClient _api;
  final ConnectivityService _connectivity;
  
  final _syncController = StreamController<SyncStatus>.broadcast();
  Stream<SyncStatus> get syncStatus => _syncController.stream;
  
  SyncEngine(this._db, this._api, this._connectivity) {
    // Listen for connectivity changes
    _connectivity.onStatusChange.listen((status) {
      if (status == ConnectivityStatus.online) {
        syncAll();
      }
    });
  }
  
  Future<SyncResult> syncAll() async {
    _syncController.add(SyncStatus.syncing);
    
    try {
      // 1. Push local changes to server
      final pendingChanges = await _db.getPendingChanges();
      for (final task in pendingChanges) {
        await _pushChange(task);
      }
      
      // 2. Pull remote changes
      final lastSync = await _getLastSyncTimestamp();
      final remoteChanges = await _api.getChanges(since: lastSync);
      
      for (final change in remoteChanges) {
        await _applyRemoteChange(change);
      }
      
      // 3. Update sync timestamp
      await _updateLastSyncTimestamp(DateTime.now());
      
      _syncController.add(SyncStatus.synced);
      return SyncResult.success(
        pushed: pendingChanges.length,
        pulled: remoteChanges.length,
      );
    } catch (e) {
      _syncController.add(SyncStatus.error);
      return SyncResult.failure(e.toString());
    }
  }
  
  Future<void> _pushChange(Task task) async {
    if (task.remoteId == null) {
      // New task - create on server
      final remoteId = await _api.createTask(task.toDto());
      await _db.markAsSynced(task.id, remoteId);
    } else {
      // Existing task - update on server
      await _api.updateTask(task.remoteId!, task.toDto());
      await _db.markAsSynced(task.id, task.remoteId!);
    }
  }
}` },
      { type: 'heading', content: 'Conflict Resolution Strategies' },
      { type: 'paragraph', content: 'Conflicts occur when both the local and remote versions of a record have been modified since the last sync. I typically implement three strategies and choose based on the data type:' },
      { type: 'list', content: '', items: [
        'Last-Write-Wins (LWW): Simple but can lose data. Best for non-critical fields like preferences.',
        'Server-Wins: Server version always takes precedence. Good for admin-controlled data.',
        'Manual Resolution: Present both versions to the user. Best for user-generated content.',
      ]},
      { type: 'code', language: 'dart', content: `abstract class ConflictResolver<T> {
  Future<T> resolve(T local, T remote);
}

class LastWriteWinsResolver extends ConflictResolver<Task> {
  @override
  Future<Task> resolve(Task local, Task remote) async {
    return local.updatedAt.isAfter(remote.updatedAt) ? local : remote;
  }
}

class ManualResolver extends ConflictResolver<Task> {
  final Future<ConflictChoice> Function(Task local, Task remote) _showDialog;
  
  ManualResolver(this._showDialog);
  
  @override
  Future<Task> resolve(Task local, Task remote) async {
    final choice = await _showDialog(local, remote);
    switch (choice) {
      case ConflictChoice.keepLocal: return local;
      case ConflictChoice.keepRemote: return remote;
      case ConflictChoice.merge:
        return local.copyWith(
          title: remote.title,  // Take remote title
          description: local.description,  // Keep local description
        );
    }
  }
}` },
      { type: 'heading', content: 'Background Sync with WorkManager' },
      { type: 'paragraph', content: 'For background sync on Android, I use the workmanager Flutter plugin which wraps Android\'s WorkManager API. This ensures sync happens even when the app is in the background:' },
      { type: 'code', language: 'dart', content: `// Initialize background sync
void initBackgroundSync() {
  Workmanager().initialize(callbackDispatcher);
  Workmanager().registerPeriodicTask(
    'sync-task',
    'periodicSync',
    frequency: const Duration(minutes: 15),
    constraints: Constraints(
      networkType: NetworkType.connected,
      requiresBatteryNotLow: true,
    ),
  );
}

@pragma('vm:entry-point')
void callbackDispatcher() {
  Workmanager().executeTask((task, inputData) async {
    final db = AppDatabase();
    final api = ApiClient();
    final syncEngine = SyncEngine(db, api, ConnectivityService());
    
    final result = await syncEngine.syncAll();
    return result.isSuccess;
  });
}` },
      { type: 'heading', content: 'Testing Offline Scenarios' },
      { type: 'paragraph', content: 'Testing offline-first apps requires simulating various network conditions. I use a combination of unit tests with mock services and integration tests with network simulation:' },
      { type: 'code', language: 'dart', content: `group('Offline-First Sync Tests', () {
  late AppDatabase db;
  late MockApiClient mockApi;
  late SyncEngine syncEngine;
  
  setUp(() {
    db = AppDatabase.forTesting();
    mockApi = MockApiClient();
    syncEngine = SyncEngine(db, mockApi, FakeConnectivity());
  });
  
  test('local changes are queued when offline', () async {
    // Create task while offline
    await db.insertTask(TasksCompanion(
      title: Value('Offline Task'),
      syncStatus: Value(SyncStatus.pending.index),
    ));
    
    final pending = await db.getPendingChanges();
    expect(pending.length, 1);
    expect(pending.first.title, 'Offline Task');
  });
  
  test('pending changes sync when back online', () async {
    // Setup pending task
    await db.insertTask(TasksCompanion(
      title: Value('Offline Task'),
      syncStatus: Value(SyncStatus.pending.index),
    ));
    
    when(mockApi.createTask(any)).thenAnswer((_) async => 'remote-123');
    
    // Trigger sync
    final result = await syncEngine.syncAll();
    
    expect(result.isSuccess, true);
    expect(result.pushed, 1);
    
    // Verify task is now synced
    final tasks = await db.getAllTasks();
    expect(tasks.first.syncStatus, SyncStatus.synced.index);
    expect(tasks.first.remoteId, 'remote-123');
  });
});` },
      { type: 'blockquote', content: 'The best offline-first apps are indistinguishable from online apps when connectivity is available, but continue to work seamlessly when it\'s not.' },
    ],
  },
  {
    slug: 'react-native-vs-flutter-real-world',
    title: 'React Native vs Flutter: A Real-World Comparison',
    excerpt: 'After shipping production apps in both frameworks, here\'s my honest assessment of performance, developer experience, and when to choose each for your next project.',
    category: 'Cross-Platform',
    tags: ['React Native', 'Flutter', 'Cross-Platform', 'Performance', 'Comparison'],
    date: 'December 10, 2025',
    dateISO: '2025-12-10',
    readTime: '10 min read',
    author,
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop',
    tableOfContents: [
      { id: 'my-background', title: 'My Background with Both', level: 2 },
      { id: 'performance-comparison', title: 'Performance Head-to-Head', level: 2 },
      { id: 'developer-experience', title: 'Developer Experience', level: 2 },
      { id: 'ui-capabilities', title: 'UI & Animation Capabilities', level: 2 },
      { id: 'ecosystem', title: 'Ecosystem & Libraries', level: 2 },
      { id: 'native-integration', title: 'Native Integration', level: 2 },
      { id: 'decision-framework', title: 'My Decision Framework', level: 2 },
    ],
    content: [
      { type: 'paragraph', content: 'I\'ve shipped 4 production apps with React Native and 6 with Flutter. Both frameworks are excellent, and the "which is better" debate misses the point entirely. The right question is: which is better for YOUR specific project? Here\'s my honest, experience-based comparison.' },
      { type: 'heading', content: 'My Background with Both' },
      { type: 'paragraph', content: 'My React Native journey started with GoEquipMe (P2P equipment marketplace) and PiZap (photo editing). For Flutter, I\'ve built Push Doctor (telehealth), Smile Member (dental), and several other production apps. This gives me a unique perspective — I\'m not advocating for either; I\'m sharing what I\'ve learned from real production usage.' },
      { type: 'heading', content: 'Performance Head-to-Head' },
      { type: 'paragraph', content: 'Let me share actual metrics from comparable screens across my apps:' },
      { type: 'code', language: 'text', content: `Metric                  | React Native  | Flutter
─────────────────────────────────────────────────────
Cold Start (Android)    | 1.8s          | 1.2s
Cold Start (iOS)        | 1.4s          | 1.1s
List Scroll (60fps)     | 55-60fps      | 58-60fps
Complex Animation       | 45-55fps      | 58-60fps
Memory (idle)           | 145MB         | 120MB
Memory (heavy usage)    | 280MB         | 210MB
Bundle Size (base)      | 8MB           | 5MB` },
      { type: 'paragraph', content: 'Flutter wins on raw performance, especially for complex animations and heavy UI. React Native has improved significantly with the New Architecture (Fabric + TurboModules), but Flutter\'s compiled Dart and Skia rendering engine give it a fundamental advantage for graphics-intensive apps.' },
      { type: 'blockquote', content: 'For 90% of apps, both frameworks perform well enough. The performance difference only matters for animation-heavy, graphics-intensive, or real-time applications.' },
      { type: 'heading', content: 'Developer Experience' },
      { type: 'paragraph', content: 'This is where it gets interesting and subjective. Here\'s my take:' },
      { type: 'paragraph', content: '**React Native Wins:**' },
      { type: 'list', content: '', items: [
        'If your team already knows JavaScript/TypeScript, the learning curve is minimal',
        'The npm ecosystem is massive — there\'s a package for almost everything',
        'Web developers can contribute to mobile code immediately',
        'Expo has made the setup and deployment experience incredibly smooth',
        'Hot reloading is slightly faster and more reliable',
      ]},
      { type: 'paragraph', content: '**Flutter Wins:**' },
      { type: 'list', content: '', items: [
        'Dart is a joy to write — null safety, pattern matching, and strong typing',
        'The widget system is incredibly composable and predictable',
        'DevTools are best-in-class for debugging layout and performance',
        'Consistent rendering across platforms — no platform-specific UI bugs',
        'Single codebase can target mobile, web, desktop, and embedded',
      ]},
      { type: 'heading', content: 'UI & Animation Capabilities' },
      { type: 'paragraph', content: 'Flutter has a clear edge here. Since it renders every pixel itself using Skia (now Impeller), you have complete control over the UI. Complex custom animations, custom painters, and shader effects are all first-class citizens.' },
      { type: 'code', language: 'dart', content: `// Flutter: Custom animated widget is straightforward
class PulsingDot extends StatefulWidget {
  @override
  _PulsingDotState createState() => _PulsingDotState();
}

class _PulsingDotState extends State<PulsingDot>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    )..repeat(reverse: true);
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.scale(
          scale: 0.8 + (_controller.value * 0.4),
          child: Container(
            width: 20,
            height: 20,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.green.withOpacity(
                0.5 + (_controller.value * 0.5),
              ),
            ),
          ),
        );
      },
    );
  }
}` },
      { type: 'paragraph', content: 'In React Native, achieving the same requires Reanimated 2/3, which is powerful but adds complexity. The bridge architecture (even with Fabric) means animations can sometimes drop frames during heavy JS thread work.' },
      { type: 'heading', content: 'Ecosystem & Libraries' },
      { type: 'paragraph', content: 'React Native benefits from the entire npm ecosystem. Need a date picker? There are 50 options. Need a chart library? Dozens available. Flutter\'s pub.dev is growing rapidly but is still smaller.' },
      { type: 'paragraph', content: 'However, quality over quantity matters. I\'ve found that Flutter packages tend to be more consistent in quality because the widget system enforces better patterns. In React Native, package quality varies wildly.' },
      { type: 'heading', content: 'Native Integration' },
      { type: 'paragraph', content: 'Both frameworks allow you to write native code when needed, but the approaches differ:' },
      { type: 'code', language: 'kotlin', content: `// React Native: TurboModule (New Architecture)
// Requires separate iOS and Android implementations
class CalendarModule(reactContext: ReactApplicationContext) : 
    NativeCalendarSpec(reactContext) {
    
    override fun getEvents(startDate: Double, endDate: Double): WritableArray {
        // Native Android implementation
        val events = WritableNativeArray()
        // ... fetch from ContentResolver
        return events
    }
}

// Flutter: Platform Channel (simpler unified approach)
// Single Dart interface, platform implementations
static const platform = MethodChannel('com.app/calendar');

Future<List<Event>> getEvents(DateTime start, DateTime end) async {
    final result = await platform.invokeMethod('getEvents', {
        'start': start.millisecondsSinceEpoch,
        'end': end.millisecondsSinceEpoch,
    });
    return (result as List).map((e) => Event.fromMap(e)).toList();
}` },
      { type: 'heading', content: 'My Decision Framework' },
      { type: 'paragraph', content: 'After years of production experience, here\'s my decision tree:' },
      { type: 'list', content: '', items: [
        'Choose Flutter when: Custom UI is critical, performance is paramount, you want web/desktop too, starting fresh with a new team',
        'Choose React Native when: Your team is JavaScript-heavy, you need deep native module integration, rapid prototyping is the priority, you\'re building on existing web infrastructure',
        'Choose Native when: You need cutting-edge platform features, AR/VR/ML is core, maximum performance is non-negotiable, you have dedicated iOS and Android teams',
      ]},
      { type: 'blockquote', content: 'The best framework is the one your team can ship quality software with. Technology debates are fun, but shipping products is what matters.' },
    ],
  },
  {
    slug: 'react-native-performance-optimization',
    title: 'React Native Performance: From 45fps to Buttery 60fps',
    excerpt: 'Practical techniques I used to optimize a production React Native app from janky scrolling to silky smooth performance, with before and after profiling data.',
    category: 'React Native',
    tags: ['React Native', 'Performance', 'Optimization', 'Profiling', 'JavaScript'],
    date: 'November 18, 2025',
    dateISO: '2025-11-18',
    readTime: '11 min read',
    author,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
    tableOfContents: [
      { id: 'the-problem', title: 'The Performance Problem', level: 2 },
      { id: 'profiling', title: 'Profiling & Identifying Bottlenecks', level: 2 },
      { id: 'list-optimization', title: 'FlatList Optimization', level: 2 },
      { id: 'render-optimization', title: 'Reducing Unnecessary Renders', level: 2 },
      { id: 'image-optimization', title: 'Image Loading Strategy', level: 2 },
      { id: 'native-driver', title: 'Using the Native Animation Driver', level: 2 },
      { id: 'results', title: 'Final Results', level: 2 },
    ],
    content: [
      { type: 'paragraph', content: 'When we launched the first version of GoEquipMe, our equipment listing screen was dropping to 45fps during scroll on mid-range Android devices. Users were complaining about "laggy" scrolling. Here\'s the systematic approach I took to achieve consistent 60fps across all devices.' },
      { type: 'heading', content: 'The Performance Problem' },
      { type: 'paragraph', content: 'Our equipment listing screen displayed 50+ items with images, prices, ratings, and distance calculations. On iPhone 13 it was fine, but on a Samsung Galaxy A52 (a popular mid-range device), the experience was noticeably janky.' },
      { type: 'paragraph', content: 'Initial profiling showed:' },
      { type: 'list', content: '', items: [
        'Average frame rate: 45fps during fast scroll',
        'JS thread blocking: 80ms+ per frame during renders',
        'Memory usage: 320MB and climbing',
        'Image loading causing visible jank',
        'Distance calculations running on every render',
      ]},
      { type: 'heading', content: 'Profiling & Identifying Bottlenecks' },
      { type: 'paragraph', content: 'Before optimizing anything, I profiled using React Native\'s built-in Performance Monitor and Flipper. The key insight was that 70% of the jank came from just three issues:' },
      { type: 'code', language: 'typescript', content: `// BEFORE: The problematic component
const EquipmentCard = ({ item, userLocation }) => {
  // Problem 1: Expensive calculation on every render
  const distance = calculateDistance(
    userLocation.lat, userLocation.lng,
    item.lat, item.lng
  );
  
  // Problem 2: Inline styles creating new objects
  return (
    <View style={{ padding: 16, marginBottom: 8, backgroundColor: '#fff' }}>
      {/* Problem 3: Unoptimized image */}
      <Image 
        source={{ uri: item.imageUrl }} 
        style={{ width: '100%', height: 200 }}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {item.title}
      </Text>
      <Text>{distance.toFixed(1)} miles away</Text>
      <Text style={{ color: 'green', fontSize: 20 }}>
        \${item.price}/day
      </Text>
    </View>
  );
};

// Used in FlatList without optimization
<FlatList
  data={equipment}
  renderItem={({ item }) => (
    <EquipmentCard item={item} userLocation={location} />
  )}
/>` },
      { type: 'heading', content: 'FlatList Optimization' },
      { type: 'paragraph', content: 'The first major win came from properly configuring FlatList. Most developers use it with default settings, which is a missed opportunity:' },
      { type: 'code', language: 'typescript', content: `// AFTER: Optimized FlatList configuration
<FlatList
  data={equipment}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  
  // Reduce initial render batch
  initialNumToRender={8}
  
  // Control off-screen rendering
  maxToRenderPerBatch={5}
  windowSize={5}
  
  // Remove items far from viewport
  removeClippedSubviews={true}
  
  // Pre-calculate item layout (huge win!)
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  
  // Prevent unnecessary re-renders
  extraData={null}
/>

// Stable references
const keyExtractor = useCallback(
  (item: Equipment) => item.id.toString(), 
  []
);

const renderItem = useCallback(
  ({ item }: { item: Equipment }) => (
    <MemoizedEquipmentCard item={item} />
  ),
  []
);` },
      { type: 'heading', content: 'Reducing Unnecessary Renders' },
      { type: 'paragraph', content: 'React.memo and useMemo were game-changers. The key was identifying which props actually change:' },
      { type: 'code', language: 'typescript', content: `// AFTER: Memoized component with stable styles
const styles = StyleSheet.create({
  card: { padding: 16, marginBottom: 8, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold' as const },
  price: { color: 'green', fontSize: 20 },
  image: { width: '100%' as any, height: 200, borderRadius: 8 },
});

const EquipmentCard = React.memo(({ item }: { item: Equipment }) => {
  // Memoize expensive calculation
  const distance = useMemo(
    () => item.distanceFromUser?.toFixed(1) ?? '—',
    [item.distanceFromUser]
  );
  
  return (
    <View style={styles.card}>
      <FastImage
        source={{ uri: item.imageUrl, priority: FastImage.priority.normal }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text>{distance} miles away</Text>
      <Text style={styles.price}>\${item.price}/day</Text>
    </View>
  );
}, (prev, next) => prev.item.id === next.item.id && 
    prev.item.updatedAt === next.item.updatedAt
);` },
      { type: 'heading', content: 'Image Loading Strategy' },
      { type: 'paragraph', content: 'Replacing the default Image component with react-native-fast-image and implementing a progressive loading strategy eliminated most visible jank:' },
      { type: 'code', language: 'typescript', content: `// Progressive image loading with placeholder
const ProgressiveImage = ({ uri, style }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <View style={style}>
      {/* Low-quality placeholder */}
      {!loaded && (
        <View style={[style, styles.placeholder]}>
          <ActivityIndicator size="small" color="#00FF87" />
        </View>
      )}
      <FastImage
        source={{
          uri,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        style={style}
        resizeMode={FastImage.resizeMode.cover}
        onLoad={() => setLoaded(true)}
      />
    </View>
  );
};

// Pre-calculate distances in the data layer, not in render
const preprocessEquipment = (items: Equipment[], userLoc: Location) => {
  return items.map(item => ({
    ...item,
    distanceFromUser: calculateDistance(
      userLoc.lat, userLoc.lng, item.lat, item.lng
    ),
  }));
};` },
      { type: 'heading', content: 'Using the Native Animation Driver' },
      { type: 'paragraph', content: 'For scroll-based animations (parallax headers, fading elements), moving animations to the native driver eliminated JS thread blocking:' },
      { type: 'code', language: 'typescript', content: `// Native-driven scroll animation
const scrollY = useRef(new Animated.Value(0)).current;

const headerHeight = scrollY.interpolate({
  inputRange: [0, 200],
  outputRange: [300, 80],
  extrapolate: 'clamp',
});

const headerOpacity = scrollY.interpolate({
  inputRange: [0, 150],
  outputRange: [1, 0],
  extrapolate: 'clamp',
});

<Animated.FlatList
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // true for transform/opacity only
  )}
  scrollEventThrottle={16}
/>` },
      { type: 'heading', content: 'Final Results' },
      { type: 'paragraph', content: 'After implementing all optimizations, the results were dramatic:' },
      { type: 'code', language: 'text', content: `Metric              | Before    | After     | Improvement
──────────────────────────────────────────────────────────
Avg Frame Rate      | 45 fps    | 59.2 fps  | +31%
JS Thread (avg)     | 80ms      | 12ms      | -85%
Memory Usage        | 320MB     | 180MB     | -44%
Time to Interactive | 3.2s      | 1.4s      | -56%
Image Load Time     | 2.1s      | 0.6s      | -71%` },
      { type: 'blockquote', content: 'Performance optimization is not about knowing every trick — it\'s about measuring first, identifying the real bottlenecks, and fixing them systematically.' },
    ],
  },
  {
    slug: 'swiftui-advanced-animations',
    title: 'Advanced SwiftUI Animations: Building Delightful Micro-Interactions',
    excerpt: 'A comprehensive guide to creating polished, physics-based animations and gesture-driven interactions in SwiftUI that make your iOS apps feel truly native and premium.',
    category: 'iOS',
    tags: ['Swift', 'SwiftUI', 'Animations', 'iOS', 'UI/UX', 'Micro-interactions'],
    date: 'October 5, 2025',
    dateISO: '2025-10-05',
    readTime: '9 min read',
    author,
    coverImage: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=1200&h=600&fit=crop',
    tableOfContents: [
      { id: 'why-animations-matter', title: 'Why Animations Matter', level: 2 },
      { id: 'spring-animations', title: 'Mastering Spring Animations', level: 2 },
      { id: 'gesture-driven', title: 'Gesture-Driven Interactions', level: 2 },
      { id: 'matched-geometry', title: 'matchedGeometryEffect Magic', level: 2 },
      { id: 'custom-transitions', title: 'Custom View Transitions', level: 2 },
      { id: 'performance-tips', title: 'Animation Performance Tips', level: 2 },
    ],
    content: [
      { type: 'paragraph', content: 'The difference between a good iOS app and a great one often comes down to the micro-interactions. Those subtle animations when you tap a button, swipe a card, or transition between screens. SwiftUI makes many animations easy, but truly delightful interactions require understanding the animation system at a deeper level.' },
      { type: 'heading', content: 'Why Animations Matter' },
      { type: 'paragraph', content: 'Apple\'s Human Interface Guidelines emphasize that animations should serve a purpose: they guide attention, provide feedback, and create a sense of continuity. In my work on MyMood AI, every interaction was designed to feel responsive and alive.' },
      { type: 'paragraph', content: 'Key principles I follow:' },
      { type: 'list', content: '', items: [
        'Animations should be fast (200-400ms for most interactions)',
        'Use spring animations for natural, physics-based motion',
        'Every state change should have a visual transition',
        'Respect the user\'s "Reduce Motion" accessibility setting',
      ]},
      { type: 'heading', content: 'Mastering Spring Animations' },
      { type: 'paragraph', content: 'SwiftUI\'s spring animation system is incredibly powerful. The key is understanding the parameters:' },
      { type: 'code', language: 'swift', content: `// The new Spring API in iOS 17+
struct BouncyButton: View {
    @State private var isPressed = false
    
    var body: some View {
        Button(action: { /* action */ }) {
            Text("Tap Me")
                .font(.headline)
                .foregroundColor(.white)
                .padding(.horizontal, 32)
                .padding(.vertical, 16)
                .background(Color.green)
                .clipShape(Capsule())
        }
        .scaleEffect(isPressed ? 0.92 : 1.0)
        .animation(.spring(
            duration: 0.3,
            bounce: 0.4,    // 0 = no bounce, 1 = very bouncy
            blendDuration: 0
        ), value: isPressed)
        .onLongPressGesture(
            minimumDuration: .infinity,
            pressing: { pressing in
                isPressed = pressing
            },
            perform: {}
        )
    }
}

// Custom spring presets for consistency
extension Animation {
    static let snappy = Animation.spring(duration: 0.25, bounce: 0.2)
    static let bouncy = Animation.spring(duration: 0.4, bounce: 0.5)
    static let smooth = Animation.spring(duration: 0.35, bounce: 0.0)
}` },
      { type: 'heading', content: 'Gesture-Driven Interactions' },
      { type: 'paragraph', content: 'The most satisfying interactions are those driven directly by the user\'s finger. Here\'s a swipeable card component I built for a dating-style feature:' },
      { type: 'code', language: 'swift', content: `struct SwipeableCard: View {
    @State private var offset: CGSize = .zero
    @State private var rotation: Double = 0
    @State private var opacity: Double = 1
    
    let onSwipeLeft: () -> Void
    let onSwipeRight: () -> Void
    
    var body: some View {
        CardContent()
            .offset(offset)
            .rotationEffect(.degrees(rotation))
            .opacity(opacity)
            .gesture(
                DragGesture()
                    .onChanged { gesture in
                        offset = gesture.translation
                        rotation = Double(gesture.translation.width / 20)
                        
                        // Fade as card moves to edge
                        let distance = abs(gesture.translation.width)
                        opacity = max(0.5, 1 - (distance / 500))
                    }
                    .onEnded { gesture in
                        let threshold: CGFloat = 150
                        
                        if gesture.translation.width > threshold {
                            // Swipe right - animate off screen
                            withAnimation(.snappy) {
                                offset = CGSize(width: 500, height: 0)
                                opacity = 0
                            }
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                                onSwipeRight()
                            }
                        } else if gesture.translation.width < -threshold {
                            // Swipe left
                            withAnimation(.snappy) {
                                offset = CGSize(width: -500, height: 0)
                                opacity = 0
                            }
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                                onSwipeLeft()
                            }
                        } else {
                            // Snap back
                            withAnimation(.bouncy) {
                                offset = .zero
                                rotation = 0
                                opacity = 1
                            }
                        }
                    }
            )
    }
}` },
      { type: 'heading', content: 'matchedGeometryEffect Magic' },
      { type: 'paragraph', content: 'One of SwiftUI\'s most powerful animation features is matchedGeometryEffect, which creates seamless transitions between views:' },
      { type: 'code', language: 'swift', content: `struct PhotoGrid: View {
    @Namespace private var animation
    @State private var selectedPhoto: Photo?
    
    let photos: [Photo]
    
    var body: some View {
        ZStack {
            // Grid view
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 100))]) {
                ForEach(photos) { photo in
                    if selectedPhoto?.id != photo.id {
                        AsyncImage(url: photo.url)
                            .matchedGeometryEffect(
                                id: photo.id, 
                                in: animation
                            )
                            .frame(height: 100)
                            .clipShape(RoundedRectangle(cornerRadius: 8))
                            .onTapGesture {
                                withAnimation(.spring(duration: 0.4, bounce: 0.2)) {
                                    selectedPhoto = photo
                                }
                            }
                    }
                }
            }
            
            // Expanded view
            if let photo = selectedPhoto {
                AsyncImage(url: photo.url)
                    .matchedGeometryEffect(id: photo.id, in: animation)
                    .frame(maxWidth: .infinity, maxHeight: 400)
                    .clipShape(RoundedRectangle(cornerRadius: 16))
                    .padding()
                    .onTapGesture {
                        withAnimation(.spring(duration: 0.4, bounce: 0.2)) {
                            selectedPhoto = nil
                        }
                    }
                    .transition(.opacity)
            }
        }
    }
}` },
      { type: 'heading', content: 'Custom View Transitions' },
      { type: 'paragraph', content: 'For navigation transitions, SwiftUI\'s new NavigationTransition API (iOS 18+) allows fully custom transitions. For earlier versions, here\'s a technique using AnyTransition:' },
      { type: 'code', language: 'swift', content: `extension AnyTransition {
    static var slideAndFade: AnyTransition {
        .asymmetric(
            insertion: .move(edge: .trailing)
                .combined(with: .opacity),
            removal: .move(edge: .leading)
                .combined(with: .opacity)
                .combined(with: .scale(scale: 0.95))
        )
    }
    
    static var cardFlip: AnyTransition {
        .modifier(
            active: FlipModifier(angle: -90, axis: (x: 0, y: 1)),
            identity: FlipModifier(angle: 0, axis: (x: 0, y: 1))
        )
    }
}

struct FlipModifier: ViewModifier {
    let angle: Double
    let axis: (x: CGFloat, y: CGFloat)
    
    func body(content: Content) -> some View {
        content
            .rotation3DEffect(
                .degrees(angle),
                axis: (x: axis.x, y: axis.y, z: 0)
            )
            .opacity(angle == 0 ? 1 : 0.5)
    }
}` },
      { type: 'heading', content: 'Animation Performance Tips' },
      { type: 'paragraph', content: 'Even in SwiftUI, animations can cause performance issues if not handled carefully:' },
      { type: 'list', content: '', items: [
        'Use drawingGroup() for complex view hierarchies to flatten into a single Metal layer',
        'Prefer animating transform properties (scale, offset, rotation) over layout properties',
        'Use @State for animation values, not @ObservedObject (avoids unnecessary view updates)',
        'Always check with Instruments > Core Animation for dropped frames',
        'Respect AccessibilityReduceMotion — provide alternative non-animated transitions',
      ]},
      { type: 'code', language: 'swift', content: `// Always respect accessibility settings
@Environment(\\.accessibilityReduceMotion) var reduceMotion

var animation: Animation {
    reduceMotion ? .none : .spring(duration: 0.4, bounce: 0.3)
}` },
      { type: 'blockquote', content: 'The best animations are the ones users don\'t consciously notice — they just make the app feel "right."' },
    ],
  },
  {
    slug: 'cicd-mobile-github-actions',
    title: 'CI/CD for Mobile Apps: A Complete GitHub Actions Pipeline',
    excerpt: 'Setting up automated testing, building, and deployment for Flutter, React Native, and native iOS/Android apps using GitHub Actions with practical workflow examples.',
    category: 'DevOps',
    tags: ['CI/CD', 'GitHub Actions', 'Flutter', 'React Native', 'DevOps', 'Automation'],
    date: 'September 12, 2025',
    dateISO: '2025-09-12',
    readTime: '14 min read',
    author,
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&h=600&fit=crop',
    tableOfContents: [
      { id: 'why-cicd', title: 'Why CI/CD for Mobile?', level: 2 },
      { id: 'flutter-pipeline', title: 'Flutter CI/CD Pipeline', level: 2 },
      { id: 'react-native-pipeline', title: 'React Native Pipeline', level: 2 },
      { id: 'native-pipeline', title: 'Native iOS/Android Pipeline', level: 2 },
      { id: 'code-signing', title: 'Code Signing & Secrets', level: 2 },
      { id: 'deployment', title: 'Automated Store Deployment', level: 2 },
      { id: 'monitoring', title: 'Post-Deploy Monitoring', level: 2 },
    ],
    content: [
      { type: 'paragraph', content: 'Manual builds are the enemy of productivity and reliability. After setting up CI/CD pipelines for 10+ mobile projects, I\'ve developed a battle-tested approach using GitHub Actions that handles testing, building, code signing, and deployment to both app stores. Here\'s the complete setup.' },
      { type: 'heading', content: 'Why CI/CD for Mobile?' },
      { type: 'paragraph', content: 'Mobile CI/CD is more complex than web CI/CD because of code signing, platform-specific builds, and app store review processes. But the benefits are enormous:' },
      { type: 'list', content: '', items: [
        'Catch bugs before they reach users — automated tests on every PR',
        'Consistent builds — no more "works on my machine" issues',
        'Faster releases — from code merge to store submission in minutes',
        'Code quality gates — linting, formatting, and coverage checks',
        'Automated versioning — semantic versioning based on commit messages',
      ]},
      { type: 'heading', content: 'Flutter CI/CD Pipeline' },
      { type: 'paragraph', content: 'Here\'s my production Flutter pipeline that runs on every pull request:' },
      { type: 'code', language: 'yaml', content: `# .github/workflows/flutter-ci.yml
name: Flutter CI/CD

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  analyze-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.24.0'
          channel: 'stable'
          cache: true
      
      - name: Install dependencies
        run: flutter pub get
      
      - name: Analyze code
        run: flutter analyze --fatal-infos
      
      - name: Check formatting
        run: dart format --set-exit-if-changed .
      
      - name: Run tests with coverage
        run: flutter test --coverage
      
      - name: Check coverage threshold
        run: |
          COVERAGE=$(lcov --summary coverage/lcov.info 2>&1 | grep "lines" | awk '{print $2}' | sed 's/%//')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi
  
  build-android:
    needs: analyze-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.24.0'
          cache: true
      
      - name: Decode keystore
        run: echo "\${{ secrets.ANDROID_KEYSTORE }}" | base64 -d > android/app/keystore.jks
      
      - name: Build APK
        run: flutter build appbundle --release
        env:
          KEYSTORE_PASSWORD: \${{ secrets.KEYSTORE_PASSWORD }}
          KEY_ALIAS: \${{ secrets.KEY_ALIAS }}
      
      - name: Upload to Play Store
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: \${{ secrets.PLAY_SERVICE_ACCOUNT }}
          packageName: com.example.app
          releaseFiles: build/app/outputs/bundle/release/app-release.aab
          track: internal` },
      { type: 'heading', content: 'React Native Pipeline' },
      { type: 'paragraph', content: 'React Native pipelines need to handle both JavaScript and native builds. Here\'s my approach:' },
      { type: 'code', language: 'yaml', content: `# .github/workflows/rn-ci.yml
name: React Native CI

on:
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'
      
      - run: yarn install --frozen-lockfile
      - run: yarn lint
      - run: yarn typecheck
      - run: yarn test --coverage --watchAll=false
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
  
  build-ios:
    needs: lint-and-test
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'
      
      - run: yarn install --frozen-lockfile
      - run: cd ios && pod install
      
      - name: Build iOS
        run: |
          xcodebuild -workspace ios/App.xcworkspace \\
            -scheme App \\
            -configuration Release \\
            -sdk iphonesimulator \\
            -destination 'platform=iOS Simulator,name=iPhone 15' \\
            build` },
      { type: 'heading', content: 'Native iOS/Android Pipeline' },
      { type: 'paragraph', content: 'For native projects, I use separate workflows for each platform with Fastlane for the heavy lifting:' },
      { type: 'code', language: 'ruby', content: `# fastlane/Fastfile (iOS)
default_platform(:ios)

platform :ios do
  desc "Run tests"
  lane :test do
    run_tests(
      scheme: "App",
      devices: ["iPhone 15"],
      code_coverage: true,
      output_types: "junit",
    )
  end
  
  desc "Build and deploy to TestFlight"
  lane :beta do
    increment_build_number(
      build_number: ENV["GITHUB_RUN_NUMBER"]
    )
    
    build_app(
      scheme: "App",
      export_method: "app-store",
    )
    
    upload_to_testflight(
      skip_waiting_for_build_processing: true,
    )
    
    slack(
      message: "New build uploaded to TestFlight!",
      channel: "#mobile-releases",
    )
  end
end` },
      { type: 'heading', content: 'Code Signing & Secrets' },
      { type: 'paragraph', content: 'Code signing is the most painful part of mobile CI/CD. Here\'s how I manage it securely:' },
      { type: 'list', content: '', items: [
        'Store certificates and provisioning profiles as base64-encoded GitHub Secrets',
        'Use Fastlane Match for iOS certificate management across team members',
        'Android keystores are stored encrypted in the repo with the password in secrets',
        'Never commit signing credentials to version control',
        'Rotate secrets quarterly and after any team member departure',
      ]},
      { type: 'heading', content: 'Automated Store Deployment' },
      { type: 'paragraph', content: 'For production releases, I use a tag-based workflow. When a version tag is pushed, the pipeline automatically builds, signs, and submits to both stores:' },
      { type: 'code', language: 'yaml', content: `# Triggered by version tags
on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  deploy-production:
    strategy:
      matrix:
        include:
          - platform: android
            runner: ubuntu-latest
          - platform: ios
            runner: macos-latest
    
    runs-on: \${{ matrix.runner }}
    steps:
      - uses: actions/checkout@v4
      
      - name: Extract version from tag
        id: version
        run: echo "VERSION=\${GITHUB_REF#refs/tags/v}" >> $GITHUB_OUTPUT
      
      - name: Build & Deploy
        run: fastlane \${{ matrix.platform }} release
        env:
          VERSION: \${{ steps.version.outputs.VERSION }}` },
      { type: 'heading', content: 'Post-Deploy Monitoring' },
      { type: 'paragraph', content: 'CI/CD doesn\'t end at deployment. I integrate monitoring to catch issues early:' },
      { type: 'list', content: '', items: [
        'Firebase Crashlytics for crash reporting with automatic issue creation',
        'Custom Slack alerts for crash rate spikes (>0.5% threshold)',
        'App store review monitoring with automatic notifications',
        'Performance monitoring dashboards in Grafana',
        'Automated rollback triggers based on crash rate thresholds',
      ]},
      { type: 'blockquote', content: 'A good CI/CD pipeline is like a good test suite — it gives you the confidence to ship fast without fear.' },
    ],
  },
  {
    slug: 'ionic-capacitor-dynamic-theming',
    title: 'Dynamic Theming in Ionic with Capacitor: CSS Variables Power',
    excerpt: 'How to build a real-time, user-customizable theming engine in Ionic apps using CSS custom properties, with persistence and native integration via Capacitor.',
    category: 'Hybrid',
    tags: ['Ionic', 'Capacitor', 'CSS', 'Theming', 'Web Components', 'PWA'],
    date: 'August 20, 2025',
    dateISO: '2025-08-20',
    readTime: '8 min read',
    author,
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop',
    tableOfContents: [
      { id: 'the-power-of-css-vars', title: 'The Power of CSS Variables', level: 2 },
      { id: 'theme-architecture', title: 'Theme Architecture', level: 2 },
      { id: 'theme-service', title: 'Building the Theme Service', level: 2 },
      { id: 'user-customization', title: 'User Customization UI', level: 2 },
      { id: 'native-integration', title: 'Native Status Bar Integration', level: 2 },
      { id: 'performance', title: 'Performance Considerations', level: 2 },
    ],
    content: [
      { type: 'paragraph', content: 'One of the unique advantages of hybrid mobile development with Ionic is the ability to leverage the full power of CSS. In this article, I\'ll show you how to build a dynamic theming engine that lets users customize their app experience in real-time — something that\'s surprisingly complex in native development but elegant with web technologies.' },
      { type: 'heading', content: 'The Power of CSS Variables' },
      { type: 'paragraph', content: 'CSS Custom Properties (variables) are the foundation of our theming engine. Unlike preprocessor variables (SASS/LESS), CSS variables are live — changing them instantly updates every element that references them, with no recompilation needed.' },
      { type: 'code', language: 'css', content: `/* theme/variables.css */
:root {
  /* Primary palette */
  --color-primary: #3880ff;
  --color-primary-rgb: 56, 128, 255;
  --color-primary-contrast: #ffffff;
  --color-primary-shade: #3171e0;
  --color-primary-tint: #4c8dff;
  
  /* Surface colors */
  --color-background: #ffffff;
  --color-surface: #f4f5f8;
  --color-text: #1a1a2e;
  --color-text-secondary: #666687;
  
  /* Spacing scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  /* Typography */
  --font-size-base: 16px;
  --font-family: 'Inter', -apple-system, sans-serif;
}` },
      { type: 'heading', content: 'Theme Architecture' },
      { type: 'paragraph', content: 'I structure themes as JSON objects that map to CSS variables. This makes them easy to store, transfer, and apply:' },
      { type: 'code', language: 'typescript', content: `// models/theme.model.ts
export interface AppTheme {
  id: string;
  name: string;
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    error: string;
    success: string;
  };
  typography: {
    fontFamily: string;
    baseFontSize: number;
    headingWeight: number;
  };
  spacing: {
    borderRadius: number;
    cardElevation: number;
  };
}

// Predefined themes
export const THEMES: Record<string, AppTheme> = {
  ocean: {
    id: 'ocean',
    name: 'Ocean Blue',
    isDark: false,
    colors: {
      primary: '#0077b6',
      secondary: '#00b4d8',
      background: '#ffffff',
      surface: '#f0f8ff',
      text: '#023e8a',
      textSecondary: '#0096c7',
      accent: '#48cae4',
      error: '#e63946',
      success: '#2d6a4f',
    },
    typography: { fontFamily: 'Inter', baseFontSize: 16, headingWeight: 700 },
    spacing: { borderRadius: 12, cardElevation: 2 },
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    isDark: true,
    colors: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      background: '#0f0f23',
      surface: '#1a1a3e',
      text: '#e2e8f0',
      textSecondary: '#94a3b8',
      accent: '#c084fc',
      error: '#f87171',
      success: '#4ade80',
    },
    typography: { fontFamily: 'Inter', baseFontSize: 16, headingWeight: 600 },
    spacing: { borderRadius: 16, cardElevation: 0 },
  },
};` },
      { type: 'heading', content: 'Building the Theme Service' },
      { type: 'paragraph', content: 'The theme service is responsible for applying themes, persisting user preferences, and providing a reactive API:' },
      { type: 'code', language: 'typescript', content: `// services/theme.service.ts
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme$ = new BehaviorSubject<AppTheme>(THEMES.ocean);
  
  get theme$(): Observable<AppTheme> {
    return this.currentTheme$.asObservable();
  }
  
  async initialize(): Promise<void> {
    const { value } = await Preferences.get({ key: 'user-theme' });
    if (value) {
      const theme = JSON.parse(value) as AppTheme;
      this.applyTheme(theme);
    }
  }
  
  applyTheme(theme: AppTheme): void {
    const root = document.documentElement;
    
    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssKey = \`--color-\${this.camelToKebab(key)}\`;
      root.style.setProperty(cssKey, value);
      
      // Also set RGB version for opacity usage
      const rgb = this.hexToRgb(value);
      if (rgb) {
        root.style.setProperty(\`\${cssKey}-rgb\`, \`\${rgb.r}, \${rgb.g}, \${rgb.b}\`);
      }
    });
    
    // Apply typography
    root.style.setProperty('--font-family', theme.typography.fontFamily);
    root.style.setProperty('--font-size-base', \`\${theme.typography.baseFontSize}px\`);
    
    // Apply spacing
    root.style.setProperty('--radius-md', \`\${theme.spacing.borderRadius}px\`);
    
    // Toggle dark mode class
    document.body.classList.toggle('dark', theme.isDark);
    
    this.currentTheme$.next(theme);
    this.persistTheme(theme);
  }
  
  private async persistTheme(theme: AppTheme): Promise<void> {
    await Preferences.set({
      key: 'user-theme',
      value: JSON.stringify(theme),
    });
  }
  
  private hexToRgb(hex: string) {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  }
  
  private camelToKebab(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
}` },
      { type: 'heading', content: 'User Customization UI' },
      { type: 'paragraph', content: 'The real magic is giving users a color picker that updates the theme in real-time. Changes are visible immediately thanks to CSS variables:' },
      { type: 'code', language: 'typescript', content: `// components/theme-picker.component.ts
@Component({
  selector: 'app-theme-picker',
  template: \`
    <ion-list>
      <ion-item *ngFor="let preset of presets" 
                (click)="selectPreset(preset)"
                [class.active]="isActive(preset)">
        <div class="color-preview" 
             [style.background]="preset.colors.primary">
        </div>
        <ion-label>{{ preset.name }}</ion-label>
      </ion-item>
      
      <ion-item-divider>Custom Colors</ion-item-divider>
      
      <ion-item>
        <ion-label>Primary Color</ion-label>
        <input type="color" 
               [value]="currentTheme.colors.primary"
               (input)="updateColor('primary', $event)">
      </ion-item>
    </ion-list>
  \`
})
export class ThemePickerComponent {
  updateColor(key: string, event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    const updated = {
      ...this.currentTheme,
      colors: { ...this.currentTheme.colors, [key]: color }
    };
    this.themeService.applyTheme(updated);
  }
}` },
      { type: 'heading', content: 'Native Status Bar Integration' },
      { type: 'paragraph', content: 'Using Capacitor, we can extend the theme to native UI elements like the status bar:' },
      { type: 'code', language: 'typescript', content: `import { StatusBar, Style } from '@capacitor/status-bar';

async applyTheme(theme: AppTheme): void {
  // ... CSS variable application ...
  
  // Update native status bar
  await StatusBar.setBackgroundColor({ 
    color: theme.colors.background 
  });
  await StatusBar.setStyle({ 
    style: theme.isDark ? Style.Dark : Style.Light 
  });
}` },
      { type: 'heading', content: 'Performance Considerations' },
      { type: 'paragraph', content: 'CSS variable updates are fast, but there are some things to watch for:' },
      { type: 'list', content: '', items: [
        'Batch variable updates — set all variables before triggering a repaint',
        'Use will-change on animated elements that depend on theme variables',
        'Avoid using CSS variables in frequently-animated properties',
        'Test on low-end devices — CSS variable resolution has a small overhead',
        'Use CSS containment (contain: content) on theme-independent sections',
      ]},
      { type: 'blockquote', content: 'The web platform gives you superpowers that native developers can only dream of. CSS variables for theming is one of those superpowers — embrace it.' },
    ],
  },
];

export const getAllCategories = (): string[] => {
  const cats = new Set(blogPosts.map(p => p.category));
  return ['All', ...Array.from(cats)];
};

export const getAllTags = (): string[] => {
  const tags = new Set(blogPosts.flatMap(p => p.tags));
  return Array.from(tags);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(p => p.slug === slug);
};

export const getRelatedPosts = (currentSlug: string, limit = 3): BlogPost[] => {
  const current = getPostBySlug(currentSlug);
  if (!current) return blogPosts.slice(0, limit);
  
  return blogPosts
    .filter(p => p.slug !== currentSlug)
    .map(p => ({
      post: p,
      score: p.tags.filter(t => current.tags.includes(t)).length +
             (p.category === current.category ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(p => p.post);
};
