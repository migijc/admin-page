angular.module('main')
.controller('IndexController', [
    '$scope', '$location', '$state', '$log', '$stateParams', '$document', '$timeout', '$sce', '$http', '$uibModal', 'IconService', 'AuthService', 'ContributorService', 'TagService', 'RootService',
    function ($scope, $location, $state, $log, $stateParams, $document, $timeout, $sce, $http, $uibModal, IconService, AuthService, ContributorService, TagService, RootService) {
        
        var standardColor = '#6F6F6F';

        var colors = [
            '#F44336',
            '#E91E63',
            '#9C27B0',
            '#673AB7',
            '#3F51B5',
            '#2196F3',
            '#03A9F4',
            '#00BCD4',
            '#009688',
            '#4CAF50',
            '#8BC34A',
            '#CDDC39',
            '#FFEB3B',
            '#FFC107',
            '#FF9800',
            '#FF5722',
            '#795548',
            '#9E9E9E',
            '#607D8B'
        ];
        var accentsTidy = function(s){
            var r = s.toLowerCase();
            r = r.replace(new RegExp(/\s/g),"");
            r = r.replace(new RegExp(/[àáâãäå]/g),"a");
            r = r.replace(new RegExp(/æ/g),"ae");
            r = r.replace(new RegExp(/ç/g),"c");
            r = r.replace(new RegExp(/[èéêë]/g),"e");
            r = r.replace(new RegExp(/[ìíîï]/g),"i");
            r = r.replace(new RegExp(/ñ/g),"n");                
            r = r.replace(new RegExp(/[òóôõö]/g),"o");
            r = r.replace(new RegExp(/œ/g),"oe");
            r = r.replace(new RegExp(/[ùúûü]/g),"u");
            r = r.replace(new RegExp(/[ýÿ]/g),"y");
            r = r.replace(new RegExp(/\W/g),"");
            return r;
        };
        $scope.isDev = true;
        $scope.isColored = true;
        $scope.toggleColor = function () {
            if ($scope.isColored) {
                angular.forEach($scope.icons, function (icon) {
                    var i = Math.floor(Math.random() * colors.length);
                    icon.color = colors[i];
                });
            } else {
                angular.forEach($scope.icons, function (icon) {
                    icon.color = standardColor;
                });
            }
            $scope.isColored = !$scope.isColored;
        };

        $scope.goToHome = function () {
            $location.url('/');
            $scope.state.isFiltered = false;
        };

        $scope.goToHistory = function () {
            $location.url('/history');
        };

        $scope.goToLogin = function () {
            var promise = AuthService.isAuthed();
            promise.then(function () {
                $location.url('/admin');
            }, function () {
                $location.url('/login');
            });
        };

        $scope.toggleHowToHelp = function () {
            $scope.state.search.isCollapsed = true;
            $scope.state.isTagFilterVisible = false;
            $scope.state.isContributorFilterVisible = false;
            $scope.state.isAddIconsVisible = !$scope.state.isAddIconsVisible;
        };

        $scope.viewGitHub = function () {
            window.location = 'https://github.com/Templarian/MaterialDesign';
        };

        $scope.goToGettingStarted = function () {
            $location.url('/getting-started');
        };

        $scope.goToGettingStartedBoostrap = function () {
            $location.url('/bootstrap');
        };

        $scope.goToStyle = function () {
            $location.url('/style');
        };

        $scope.goToCustom = function () {
            $location.url('/custom');
        };

        $scope.goToDownload = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'download.html',
                controller: 'CodeViewerController',
                size: 'lg',
                resolve: {
                    icon: function () {
                        return null;
                    }
                }
            });
            //window.location = 'https://github.com/Templarian/MaterialDesign/archive/master.zip';
        };

        $scope.donate = function () {
            window.location = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=A7485AUJF2E9G';
        };

        $scope.filterCommunity = function () {
            if ($location.url() == '/tag/community') {
                $location.url('/');
            } else {
                $location.url('/tag/community');
            }
        };

        $scope.goToTag = function (tagText) {
            $location.url('/tag/' + tagText.replace(' ', '-'));
        };

        $scope.goToContributor = function (name) {
            $location.url('/contributor/' + name.replace(/ /g, '-').replace(/\./g, ''));
        };

        $scope.twitterWidgetInit = function () {
            if (typeof window.twttr != 'undefined') {
                window.twttr.widgets.load();
            }
        };
        
        $scope.state = {
            selected: {
                name: 'Loading...',
                size: 24,
                iconCount: 0
            },
            totalIcons: '-',
            filteredIcons: 0,
            packageId: null,
            search: {
                text: '',
                isCollapsed: true,
                isFocused: false,
                isTagsLoading: true,
                isTagsCollapsed: true,
                filterTag: '',
                toggle: function ($event) {
                    this.isCollapsed = !this.isCollapsed;
                    $scope.state.isAddIconsVisible = false;
                    $scope.state.isContributorFilterVisible = false;
                    if ($scope.state.search.isTagsLoading) {
                        $scope.state.search.isFocused = true;
                        var promise = TagService.getTags();
                        promise.then(function (tags) {
                            $scope.tags = tags;
                            $scope.state.search.isTagsLoading = false;
                        }, function () {

                        });
                    }
                    if ($event) {
                        $event.preventDefault();
                    }
                },
                shortcut: function () {
                    this.isCollapsed = true;
                    this.toggle();
                    this.isTagsCollapsed = true;
                },
                toggleTags: function ($event) {
                    this.isTagsCollapsed = !this.isTagsCollapsed;
                    this.toggle();
                    if ($event) {
                        $event.preventDefault();
                    }
                },
                keyDown: function ($event) {
                    if ($event.keyCode == 27) {
                        this.toggle($event);
                    } else if ($event.keyCode == 9) {
                        this.toggleTags($event);
                    }
                },
                keyUp: function () {
                    if (this.text.length > 0) {
                        this.isTagsCollapsed = true;
                    }
                },
                blur: function () {
                    ga('send', {
                        'hitType': 'event',           // Required.
                        'eventCategory': 'search',    // Required.
                        'eventAction': 'blur',        // Required.
                        'eventLabel': accentsTidy(this.text.toLowerCase())
                    });
                }
            },
            contributors: {
                isLoading: true
            },
            isLoadingIcons: true,
            isSearchFilterFocused: false,
            isFiltered: false,
            isSearchFilterVisible: false,
            isTagFilterVisible: false,
            isContributorFilterVisible: false,
            isAddIconsVisible: false,
            isContributorPage: false,
            isTagPage: false,
            tag: ''
        };

        function isAlias(text, aliases) {
            for (var i = 0; i < aliases.length; i++) {
                if (aliases[i].replace(/-/g, '').indexOf(text) > -1) {
                    return true;
                }
            }
            return false;
        };

        $scope.$watch('state.search.text', function (value) {
            if (typeof value != 'undefined') {
                value = value.toLowerCase();
                value = accentsTidy(value);
                if (value == '') {
                    for (var i = 0; i < $scope.icons.length; i++) {
                        $scope.icons[i].hidden = false;
                    }
                    $scope.state.filteredIcons = $scope.state.totalIcons;
                } else {
                    var count = 0;
                    for (var j = 0; j < $scope.icons.length; j++) {
                        $scope.icons[j].hidden = !($scope.icons[j].name.replace(/-/g, '').indexOf(value) > -1 || isAlias(value, $scope.icons[j].aliases));
                        if (!$scope.icons[j].hidden) { count++; }
                    }
                    $scope.state.filteredIcons = count;
                }
            }
        });

        $scope.removeFilters = function () {
            $scope.state.search.text = '';
            $scope.state.search.isCollapsed = true;
            $location.url('/');
        }

        $scope.tags = [];
        $scope.contributors = [];
        $scope.contributor = {
            name: '...',
            twitter: '...',
            avatar: null,
            description: '...',
            website: '',
            github: '',
            count: 0
        };

        var promisePackages = RootService.getPackages();
        promisePackages.then(function (packages) {
            if (packages.length == 0) {
                $log.error('No icon packages assigned to domain.');
            } else if (packages.length == 1) {
                $scope.state.packageId = packages[0].id;
                $scope.state.totalIcons = packages[0].iconCount;
                $scope.state.size = packages[0].size;
                loadIcons();
            } else {
                $log.warn('Multiple icon packages assigned to domain not supported.');
            }
        }, function () {

        });

        $scope.icons = [];
        
        var originalState = $state.current.name;

        function loadIcons () {
            var promise = null;
            if (originalState == 'app.contributor') {
                promise = IconService.getIconsByUser($scope.state.packageId, $stateParams.name);
                $scope.state.isContributorPage = true;
                $scope.state.isFiltered = true;
                var contributorPromise = ContributorService.getContributorByName($stateParams.name);
                contributorPromise.then(function (data) {
                    $scope.contributor = data;
                }, function () {
                
                });
            } else if (originalState == 'app.tag') {
                $scope.state.isTagPage = true;
                if ($stateParams.tag == 'community') {
                    var promise = IconService.getIconsByTag($scope.state.packageId, 'community');
                    $scope.state.isFiltered = true;
                    $scope.state.tag = 'Community';
                } else {
                    promise = IconService.getIconsByTag($scope.state.packageId, $stateParams.tag);
                    $scope.state.isFiltered = true;
                    $scope.state.tag = $stateParams.tag;
                }
            } else if (originalState == 'app.icon') {
                promise = IconService.getIconsByName($scope.state.packageId, $stateParams.icon);
                $scope.state.isFiltered = true;
            } else {
                promise = IconService.getIcons($scope.state.packageId);
            }
            promise.then(function (data) {
                $scope.icons = data.icons;
                angular.forEach($scope.icons, function (icon) {
                    icon.color = standardColor;
                });
                $scope.state.filteredIcons = data.icons.length;
                $scope.state.isLoadingIcons = false;
                if (originalState == 'app.icon') {
                    for (var i = 0; i < $scope.icons.length; i++) {
                        if ($scope.icons[i].name == $stateParams.name) {
                            $scope.viewIcon($scope.icons[i]);
                            return;
                        }
                    }
                
                }
            });
        }

        $scope.viewIcon = function (icon) {
            $uibModal.open({
                templateUrl: 'icon.html',
                controller: 'IconViewController',
                windowClass: 'viewForm',
                size: 'lg',
                resolve: {
                    icon: function () {
                        var mdiName = ("mdi-" + icon.name).replace(/-([a-z0-9])/g, function (g) { return g[1].toUpperCase(); });
                        return {
                            id: icon.id,
                            name: icon.name,
                            mdiName: mdiName,
                            description: '...',
                            data: icon.data,
                            aliases: icon.aliases,
                            user: {
                                name: icon.user.name,
                                twitter: '...',
                                email: ''
                            }
                        };
                    }
                }
            });
        };
        /*
        $scope.commentForm = {
            isVisible: false,
            isDelayVisible: false,
            show: function (icon) {
                icon = icon || $scope.viewForm.icon;
                var commentForm = this,
                    viewForm = $scope.viewForm;;
                
                commentForm.id = icon.id;
                commentForm.isVisible = false;
                commentForm.buttonMessage = '...';

                if (icon.id != viewForm.icon.id) {
                    viewForm.comments = [];
                    var promise = IconService.getIcon(icon.id);
                    promise.then(function (data) {

                        for (var i = 0, c = data.comments.length; i < c; i++) {
                            viewForm.comments.push({
                                name: data.comments[i].name,
                                date: data.comments[i].date,
                                twitter: data.comments[i].twitter,
                                email: data.comments[i].email || '',
                                text: $sce.trustAsHtml('<p>' + data.comments[i].text.split(/\r?\n/).join('</p><p>') + '</p>'),
                                isAuthor: data.comments[i].isAuthor
                            });
                            if (data.comments.length == 0) {
                                commentForm.buttonMessage = "Be the first to leave feedback for this icon";
                            } else {
                                commentForm.buttonMessage = "Leave Feedback";
                            }
                        }
                    }, function () {});
                }
                var body = $document.find('body').eq(0);
                body.addClass('modal-open');
                commentForm.isDelayVisible = true;
                $timeout(function () {
                    commentForm.isVisible = true;
                }, 1);
            },
            hide: function () {
                var commentForm = this;
                var body = $document.find('body').eq(0);
                commentForm.isVisible = false;
                $timeout(function () {
                    body.removeClass('modal-open');
                    commentForm.isDelayVisible = false;
                }, 300);
            },
            id: null,
            name: '',
            twitter: '',
            email: '',
            text: '',
            field: {
                name: {
                    isInvalid: false
                },
                twitter: {
                    isInvalid: false
                },
                email: {
                    isInvalid: false
                },
                text: {
                    isInvalid: false
                }
            },
            submit: function () {
                var viewForm = $scope.viewForm,
                    commentForm = this;
                commentForm.text = commentForm.text.replace('@', '');
                var promise = CommentService.addComment({
                    id: commentForm.id,
                    name: commentForm.name,
                    twitter: commentForm.twitter,
                    email: commentForm.email,
                    text: commentForm.text
                });
                promise.then(function () {
                    viewForm.comments.push({
                        name: commentForm.name,
                        twitter: commentForm.twitter,
                        date: 'Now',
                        text: $sce.trustAsHtml('<p>' + commentForm.text.split(/\r?\n/).join('</p><p>') + '</p>'),
                        isAuthor: true
                    });
                    commentForm.name = '';
                    commentForm.twitter = '';
                    commentForm.email = '';
                    commentForm.text = '';
                    commentForm.field.name.isInvalid = false;
                    commentForm.field.twitter.isInvalid = false;
                    commentForm.field.email.isInvalid = false;
                    commentForm.field.text.isInvalid = false;
                    commentForm.isVisible = false;
                }, function () {
                    alert('Failed to send comment.');
                });
            }
        };
        */
        $scope.goToGitHubIssues = function () {
            window.location = 'https://github.com/Templarian/MaterialDesign/issues';
        };

        var updatePreview = function () {

        };

        $scope.fontForm = {
            icons: []
        };

        $scope.menuOptions = [
            ['Download .PNG 24x24', function ($itemScope) {
                window.location = '/api/download/icon/png/' + $itemScope.icon.id;
            }],
            ['Download .PNG 36x36', function ($itemScope) {
                window.location = '/api/download/icon/png/' + $itemScope.icon.id + '/36';
            }],
            ['Download .PNG 48x48', function ($itemScope) {
                window.location = '/api/download/icon/png/' + $itemScope.icon.id + '/48';
            }],
            null,
            ['Download .SVG Compressed', function ($itemScope) {
                window.location = '/api/download/icon/svg/' + $itemScope.icon.id;
            }],
            ['Download .SVG Webfont', function ($itemScope) {
                window.location = '/api/download/icon/svgwebfont/' + $itemScope.icon.id;
            }],
            ['Download .XML Vector Drawable', function ($itemScope) {
                window.location = '/api/download/icon/vectordrawable/' + $itemScope.icon.id;
            }],
            ['Download .XAML (Canvas)', function ($itemScope) {
                window.location = '/api/download/icon/xaml/' + $itemScope.icon.id;
            }],
            ['Download .XAML (DrawImage)', function ($itemScope) {
                window.location = '/api/download/icon/xamldrawimage/' + $scope.icon.id;
            }],
            null,
            ['View SVG', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'svgViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            ['View XAML (Canvas)', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'xamlViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            ['View XAML (DrawImage)', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'xamlDrawImageViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            ['View Vector Drawable', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'drawableViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            null,
            ['Add to Font Subset', function ($itemScope) {
                alert('Coming soon...');
            }],
            null,
            ['View Comments', function ($itemScope) {
                $scope.commentForm.show($itemScope.icon);
            }]
        ];

        $scope.viewContributorFilters = function () {
            $scope.state.isAddIconsVisible = false;
            $scope.state.isTagFilterVisible = false;
            $scope.state.search.isCollapsed = true;
            $scope.state.isContributorFilterVisible = !$scope.state.isContributorFilterVisible;
            if ($scope.contributors.length == 0) {
                var promise = ContributorService.getContributors($scope.state.packageId);
                promise.then(function (contributors) {
                    $scope.state.contributors.isLoading = false;
                    $scope.contributors = contributors;
                }, function () {

                });
            }
        };

        $scope.contributorContext = [
            ['View Profile', function ($itemScope) {
                $scope.goToContributor($itemScope.contributor.name);
            }]
        ];

    }
]);