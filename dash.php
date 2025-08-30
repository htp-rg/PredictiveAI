<?php

$title = "GoHighLevel-Style Dashboard";
$appName = "LGU 3 ADMIN SYSTEM";

$kpis = [
    ["Leads", "1,284", "+12% MoM"],
    ["Opportunities", "342", "+5% MoM"],
    ["Close Rate", "28%", "+2 pts"],
    ["Revenue", "$48.3k", "+9% MoM"]
];

$tasks = [
    ["Call new leads", false],
    ["Launch email campaign", true],
    ["Update funnel step", false],
    ["Review automation", false]
];

$opportunities = [
    ["Website Redesign", "Proposal", "$8,400", "Alex", "Today"],
    ["SEO Retainer", "Negotiation", "$2,100", "Sam", "Yesterday"],
    ["Ads Package", "Qualified", "$3,600", "Jamie", "Aug 20"],
    ["CRM Migration", "Discovery", "$5,200", "Riley", "Aug 17"]
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= $title ?></title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="app">
    
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <div class="logo">Ad</div>
        <span><?= $appName ?></span>
      </div>
      <nav>
        <div class="nav-group">
          <div class="nav-label">Main</div>
          <a href="#" class="nav-item active" data-route="dashboard"><span>Dashboard</span></a>
          <a href="#" class="nav-item" data-route="contacts"><span>Contacts</span></a>
          <a href="#" class="nav-item" data-route="opportunities"><span>Opportunities</span></a>
          <a href="#" class="nav-item" data-route="marketing"><span>Marketing</span></a>
          <a href="#" class="nav-item" data-route="automations"><span>Automations</span></a>
        </div>
        <div class="nav-group">
          <div class="nav-label">Assets</div>
          <a href="#" class="nav-item" data-route="websites"><span>Websites</span></a>
          <a href="#" class="nav-item" data-route="funnels"><span>Funnels</span></a>
          <a href="#" class="nav-item" data-route="reporting"><span>Reporting</span></a>
          <a href="#" class="nav-item" data-route="settings"><span>Settings</span></a>
        </div>
      </nav>
    </aside>


    <section class="main">
      <header class="topbar">
        <button class="btn menu-btn" id="menuBtn">☰</button>
        <div class="search">
          <span>🔎</span>
          <input id="searchInput" type="search" placeholder="Search…" />
        </div>
        <div class="actions">
          <button class="btn" id="newBtn">+ New</button>
          <button class="btn" id="exportBtn">Export</button>
        </div>
      </header>

      <div class="content">
        <div class="breadcrumbs">Home / <span id="crumb">Dashboard</span></div>
        <div class="page-title">
          <h1 id="pageTitle">Dashboard</h1>
          <div class="actions">
            <button class="btn" id="refreshBtn">Refresh</button>
          </div>
        </div>


        <div class="grid" style="grid-template-columns: repeat(12, 1fr);">
          <?php foreach ($kpis as $kpi): ?>
            <div class="card anim-pop" style="grid-column: span 3;">
              <h3><?= $kpi[0] ?></h3>
              <div class="kpi">
                <span class="value"><?= $kpi[1] ?></span>
                <span class="delta"><?= $kpi[2] ?></span>
              </div>
            </div>
          <?php endforeach; ?>
        </div>

        <div class="grid" style="grid-template-columns: repeat(12, 1fr); margin-top:1rem;">
          <div class="card anim-fade" style="grid-column: span 8;">
            <h3>Pipeline (Last 6 Weeks)</h3>
            <canvas id="pipelineChart" height="180"></canvas>
            <div class="footer-note">All values are illustrative.</div>
          </div>
          <div class="card anim-fade" style="grid-column: span 4;">
            <h3>Tasks</h3>
            <ul class="task-list">
              <?php foreach ($tasks as $task): ?>
                <li>
                  <label>
                    <input type="checkbox" <?= $task[1] ? "checked" : "" ?> />
                    <?= $task[0] ?>
                  </label>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
        </div>


        <div class="card anim-fade" style="margin-top:1rem;">
          <h3>Recent Opportunities</h3>
          <table class="table" id="oppsTable">
            <thead>
              <tr><th>Deal</th><th>Stage</th><th>Value</th><th>Owner</th><th>Updated</th></tr>
            </thead>
            <tbody>
              <?php foreach ($opportunities as $opp): ?>
                <tr>
                  <td><?= $opp[0] ?></td>
                  <td><?= $opp[1] ?></td>
                  <td><?= $opp[2] ?></td>
                  <td><?= $opp[3] ?></td>
                  <td><?= $opp[4] ?></td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  </div>

  <div class="overlay" id="overlay"></div>

  <script src="scrip.js"></script>
</body>
</html>
